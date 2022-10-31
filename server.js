const express = require('express');
require('dotenv').config();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const checkScope = require('express-jwt-authz');

const jwtCheck = jwt.expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

const app = express();

app.get('/api/public', (req, res) => {
  res.json({
    message: 'Response from Public API!',
  });
});

app.get('/api/private', jwtCheck, (req, res) => {
  res.json({
    message: 'Response from Private API!',
  });
});

app.get(
  '/api/course',
  jwtCheck,
  checkScope(['read:courses'], { customUserKey: 'auth' }),
  (req, res) => {
    res.json({
      courses: [
        { id: 1, name: 'course 1' },
        { id: 2, name: 'course 2' },
      ],
    });
  }
);
app.listen(3001);
console.log('Listening on: ', process.env.REACT_APP_AUTH0_API_URL);
