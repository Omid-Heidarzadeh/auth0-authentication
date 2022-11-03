import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.userProfile = null;
    this.requestedScopes = 'openid profile email read:courses';
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
      responseType: 'token id_token',
      scope: this.requestedScopes,
    });
  }

  login = (lastPage = '') => {
    if (typeof lastPage === 'string' && lastPage.length > 0)
      localStorage.setItem(_lastPage, JSON.stringify(lastPage));

    this.auth0.authorize();
  };

  get isAuthenticated() {
    const expiresAt = localStorage.getItem('expiresAt');
    return expiresAt && expiresAt > Date.now();
  }

  handleAuthentication = () => {
    const lastPageAddress = JSON.parse(localStorage.getItem(_lastPage)) || '/';

    this.auth0.parseHash((err, authInfo) => {
      if (authInfo && authInfo.accessToken && authInfo.idToken) {
        this.setSession(authInfo);
        window.location.replace('/');
      } else if (err) {
        console.log(err);
        window.location.replace('/');
        setTimeout(
          () =>
            alert(
              `An unexpected error occurred! For more info check console. ${err.error}`
            ),
          500
        );
      }
      localStorage.removeItem(_lastPage);
    });
  };

  setSession = (authInfo) => {
    const expiresAt = authInfo.expiresIn * 1000 + Date.now();
    const scope = authInfo.scope;

    localStorage.setItem('accessToken', authInfo.accessToken);
    localStorage.setItem('idToken', authInfo.idToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
    localStorage.setItem('scope', JSON.stringify(scope));
  };

  logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('scope');
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_CLIENT_ID,
      returnTo: 'http://localhost:3000',
    });
  };

  getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile = (callback) => {
    if (this.userProfile) return callback(null, this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      callback(err, profile);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = JSON.parse(localStorage.getItem('scope')).split(' ');
    return scopes.every((scope) => grantedScopes.includes(scope));
  }
}
