import React from 'react';

function ProfileInfo(props) {
  const { profile } = props;
  const { email, email_verified, picture, nickname, ...rest_profile_info } =
    profile;
  const verification = email_verified
    ? { text: 'Verified', color: 'green' }
    : { text: 'Not verified', color: 'red' };

  return (
    <div>
      <img src={picture} alt="user profile" />
      <table>
        <tbody>
          <tr>
            <td>Username:</td>
            <td>{nickname}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>
              {
                <span>
                  {email}{' '}
                  <span style={{ color: verification.color }}>
                    {`(${verification.text})`}
                  </span>
                </span>
              }
            </td>
          </tr>
          {Object.entries(rest_profile_info).map(([key, value]) => {
            return (
              <tr key={key}>
                <td>{key} : </td>
                <td>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProfileInfo;
