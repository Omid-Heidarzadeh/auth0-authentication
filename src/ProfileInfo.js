import React from 'react';

function ProfileInfo(props) {
  const { profile } = props;
  return (
    <div>
      <img src={profile.picture} alt="user profile" />
      <table>
        <tbody>
          <tr>
            <td>Username:</td>
            <td>{profile.nickname}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              {
                <span>
                  {profile.email}{' '}
                  {profile.email_verified ? (
                    <span style={{ color: 'green' }}>(verified)</span>
                  ) : (
                    <span style={{ color: 'red' }}>(unverified)</span>
                  )}
                </span>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProfileInfo;
