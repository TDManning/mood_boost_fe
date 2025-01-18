import "./UserProfile.css";
import { useState, useEffect } from "react";
import UserActivityList from "./UserActivityList";

const UserProfile = ( ) => {
  console.log("UserProfile is rendered");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem('userId');
  console.log("userId from sessionStorage:", userId);
  
  useEffect(() => {
    console.log("useEffect is triggered");
    if (!userId) {
      console.error("userId is missing or undefined");
      return;
    }

    const fetchUserActivities = async () => {
      try {
        console.log("Fetching activities...");
        const response = await fetch(`http://localhost:5000/api/v1/users/${userId}/activities`);

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        console.log("Fetched activities:", data);
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching user activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserActivities();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="userHistory">
      {activities.length > 0 ? (
        <UserActivityList activities={activities} />
      ) : (
        <p>No activities found for this user.</p>
      )}
    </div>
  );
};

export default UserProfile;