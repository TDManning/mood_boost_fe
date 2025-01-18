import React from "react";

const UserActivityList = ({ activities }) => {
  return (
    <div>
      <h3>Activity History:</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.name}</strong>
            (Completed on: {new Date(activity.created_at).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserActivityList;
