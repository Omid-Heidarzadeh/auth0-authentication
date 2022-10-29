const express = require('express');
require('dotenv').config();

const app = express();

app.get('/api/public', (req, res) => {
  res.json({
    message: 'Response from Public API!',
  });
});

app.listen(3001);
console.log('Listening on: ', process.env.REACT_APP_AUTH0_API_URL);
