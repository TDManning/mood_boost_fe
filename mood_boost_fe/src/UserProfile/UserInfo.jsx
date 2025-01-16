import React from "react";

const UserInfo = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Member Since: {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default UserInfo;
