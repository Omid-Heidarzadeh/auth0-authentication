import auth0 from 'auth0-js';

export default class Auth {
  constructor() {
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: 'token id_token',
      scope: 'openid profile email',
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  get isAuthenticated() {
    const expiresAt = localStorage.getItem('expiresAt');
    return expiresAt && expiresAt > Date.now();
  }

  handleAuthentication = () => {
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
    });
  };

  setSession = (authInfo) => {
    const expiresAt = authInfo.expiresIn * 1000 + Date.now();

    localStorage.setItem('accessToken', authInfo.accessToken);
    localStorage.setItem('idToken', authInfo.idToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
  };

  logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_CLIENT_ID,
      returnTo: 'http://localhost:3000',
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };

  getProfile = (callback) => {
    if (this.userProfile) return callback(null, this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        callback(null, profile);
      } else callback(err, null);
    });
  };
}
