import React, { useContext, useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import { AuthContext } from './context/AuthContext';

function Profile(props) {
  const auth = useContext(AuthContext);
  const [{ profile, error }, setState] = useState({
    profile: null,
    error: null,
  });

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getUserProfile() {
    auth.getProfile((error, profile) => {
      setState({ profile, error });
    });
  }

  return (
    <div>
      <h1>Profile</h1>
      {error ? (
        <div>Error getting profile info: {error}</div>
      ) : profile ? (
        <ProfileInfo profile={profile} />
      ) : (
        <div>Loading profile...</div>
      )}
    </div>
  );
}

export default Profile;
