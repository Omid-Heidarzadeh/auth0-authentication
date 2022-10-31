import React, { useEffect, useRef, useState } from 'react';

function Public() {
  const [state, setState] = useState({ message: '' });
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    const abort = new AbortController();

    fetch('/api/public', { credentials: 'include', signal: abort.signal })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response is not OK');
      })
      .then((response) => setState({ message: response.message }))
      .catch((error) => setState({ message: error.message }))
      .finally(() => (fetched.current = true));

    return () => abort.abort();
  }, []);

  return <div>{state.message}</div>;
}

export default Public;
