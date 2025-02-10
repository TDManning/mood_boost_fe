import { useState, useEffect } from "react";
import UserActivityList from "./UserActivityList";
import UserActivityChart from "./UserActivityChart";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://mood-boost-331e5d0cb48e.herokuapp.com";

const UserProfile = () => {
  console.log("UserProfile is rendered");

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  console.log("userId from sessionStorage:", userId);

  useEffect(() => {
    const initializeGuestUser = async () => {
      if (!userId) {
        console.log("No user found, fetching guest user...");

        try {
          const response = await fetch(`${API_BASE_URL}/guest_user`);

          if (!response.ok) {
            console.error("Failed to fetch guest user. Status:", response.status);
            throw new Error("Guest user creation failed");
          }

          const data = await response.json();
          sessionStorage.setItem("userId", data.guest_id);
          setUserId(data.guest_id);
          console.log("✅ Guest user assigned:", data.guest_id);
        } catch (error) {
          console.error("❌ Error fetching guest user:", error);
        }
      }
    };

    initializeGuestUser();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserActivities = async () => {
      try {
        console.log("Fetching activities for user:", userId);
        const response = await fetch(`${API_BASE_URL}/users/${userId}/activities`);

        if (!response.ok) throw new Error("Failed to fetch activities");

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
        <>
          <UserActivityChart activities={activities} /> 
          <UserActivityList activities={activities} />
        </>
      ) : (
        <p>No activities found for this user.</p>
      )}
    </div>
  );
};

export default UserProfile;
