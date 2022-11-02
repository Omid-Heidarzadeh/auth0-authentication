import React from 'react';

function AccessDenied() {
  const scopes = new URL(window.location.href).searchParams
    .get('scopes')
    .split(',');

  return (
    <div>
      <h1>Access Denied</h1>
      <p>Unathorized: you need the following scopes to access this page</p>
      <br />
      <p>{scopes.join(' ')}</p>
    </div>
  );
}

export default AccessDenied;
