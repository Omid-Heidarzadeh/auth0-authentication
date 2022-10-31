import React, { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function Private(props) {
  const auth = useContext(AuthContext);
  const [state, setState] = useState({ message: '' });
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    const abort = new AbortController();

    fetch('/api/private', {
      headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
      signal: abort.signal,
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response is not OK');
      })
      .then((response) => setState({ message: response.message }))
      .catch((error) => setState({ message: error.message }))
      .finally(() => (fetched.current = true));

    return () => abort.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{state.message}</div>;
}

export default Private;
