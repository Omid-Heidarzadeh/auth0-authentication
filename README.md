# Getting Started

First you need to signup for [Auth0](https://auth0.com/).

Create new `tenant` then from dashboard select `Create Application` and select `single page application` as application type.
Under `settings` tab, find `Domain` address and `Client ID`.

Add `.env` file with following environment variables to main directory of the project. Be sure to replace `AUTH0-DOMAIN-ADDRESS` and `AUTH0-CLIENT-ID` with information from your auth0 application.

| Variable                     | Value                             |
| ---------------------------- | --------------------------------- |
| REACT_APP_AUTH0_DOMAIN       | AUTH0-DOMAIN-ADDRESS              |
| REACT_APP_CLIENT_ID          | AUTH0-CLIENT-ID                   |
| REACT_APP_AUTH0_CALLBACK_URL | http://localhost:3000/callback    |
| REACT_APP_AUTH0_AUDIENCE     | http://localhost:3001/api/private |
| REACT_APP_AUTH0_API_URL      | http://localhost:3001/api         |

On `settings` tab under `Application URIs` section add the following values and save the changes:

| Option                | Value                          |
| --------------------- | ------------------------------ |
| Allowed callback URLs | http://localhost:3000/callback |
| Allowed logout URLs   | http://localhost:3000          |
| Allowed web origins   | http://localhost:3000          |

From main navigation menu open `API` tab and create a new API with desired name and `http://localhost:3001/api/private` as `identifier`.

Select newly created API then under `settings` tab make sure to enable `RBCA` and `Add permissions in the Access token`. Save the changes. Open `permissions` tab and add `read:courses` scope to permissions.

Under `User Management` select `Roles` and add `admin` role with `read:courses` permission.

Under `Auth Pipeline` select `Rules` and add following rules with their correspondig script.

## Set roles to a user

### script

```javascript
function setRolesToUser(user, context, callback) {
  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  user.app_metadata = user.app_metadata || {};
  // You can add a Role based on what you want
  // In this case I check domain
  const addRolesToUser = function (user) {
    // for simplicity set users with gmail account
    // as admin
    const endsWith = '@gmail.com';

    if (
      user.email &&
      user.email.substring(
        user.email.length - endsWith.length,
        user.email.length
      ) === endsWith
    ) {
      return ['admin'];
    }
    return ['user'];
  };

  const roles = addRolesToUser(user);

  user.app_metadata.roles = roles;
  auth0.users
    .updateAppMetadata(user.user_id, user.app_metadata)
    .then(function () {
      context.idToken['http://localhost:3000/roles'] = user.app_metadata.roles;
      callback(null, user, context);
    })
    .catch(function (err) {
      callback(err);
    });
}
```

## Add roles to Access Token

### Script

```javascript
function (user, context, callback) {
  if (user.app_metadata && user.app_metadata.roles)
    context.accessToken['http://localhost:3000/roles'] = user.app_metadata.roles;
  return callback(null, user, context);
}
```

Make sure to sort rules as above. The first rule assign roles (`user` or `admin`) to users. The second rule assures that assigned roles are included in the returned `Access Token` JWT.

## Install dependencies

run `npm install` to install app dependencies.

## Run App

Now you should be able to run the app using `npm start`.

## About app and its usage

This app is a simple implementation of Auth0 authentication.

On first page-load the app checkes if there is an active session and tries to renew tokes on memory for current user which is called `Silent Authentication`. If it succeed, navbar and main page content update accordingly. Otherwise, user has only access to the so called `/public` route.

Each new user needs to sign up to be able to access `/private` route.

Also there is a `/courses` route which is only accessible to users with `admin` role. To assign `admin` role to a user you need to do so using `users` tab under `User management` submenu of Auth0 dashboard. Make sure that the selected user has a verified email address.

After doing so, user needs to logout and re-login to be able to access `/courses` route.

