import auth0 from 'auth0-js';

const _lastPage = 'lastPage';
let _accessToken = '';
// eslint-disable-next-line
let _idToken = '';
let _expiresAt = '';
let _scope = '';

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

  setNavigate(navigate) {
    this.navigate = navigate;
  }

  login = (lastPage = '') => {
    if (typeof lastPage === 'string' && lastPage.length > 0)
      localStorage.setItem(_lastPage, JSON.stringify(lastPage));

    this.auth0.authorize();
  };

  get isAuthenticated() {
    return _expiresAt > Date.now();
  }

  handleAuthentication = () => {
    const lastPageAddress = JSON.parse(localStorage.getItem(_lastPage)) || '/';

    this.auth0.parseHash((err, authInfo) => {
      if (authInfo && authInfo.accessToken && authInfo.idToken) {
        this.setSession(authInfo);
        this.navigate(lastPageAddress);
      } else if (err) {
        console.log(err);
        this.navigate(lastPageAddress);
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
    _expiresAt = authInfo.expiresIn * 1000 + Date.now();
    _scope = authInfo.scope;
    _accessToken = authInfo.accessToken;
    _idToken = authInfo.idToken;
  };

  logout = () => {
    _accessToken = '';
    _idToken = '';
    _expiresAt = '';
    _scope = '';
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_CLIENT_ID,
      returnTo: 'http://localhost:3000',
    });
  };

  getAccessToken() {
    if (!_accessToken) {
      throw new Error('No access token found');
    }
    return _accessToken;
  }

  getProfile = (callback) => {
    if (this.userProfile) return callback(null, this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      callback(err, profile);
    });
  };

  userHasScopes(claimedScopes) {
    const grantedScopes = _scope.split(' ');
    return claimedScopes.every((scope) => grantedScopes.includes(scope));
  }
}
