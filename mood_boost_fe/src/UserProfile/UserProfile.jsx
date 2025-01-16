import "./UserProfile.css";
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import UserInfo from "./UserInfo";
import UserActivityList from "./UserActivityList";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://localhost:3000/api/v1/users/${userId}`);
        const userData = await userResponse.json();
        setUser(userData);

        const activitiesResponse = await fetch(`/api/v1/users/${userId}/activities`);
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <UserInfo user={user} />
      <UserActivityList activities={activities} />
    </div>
  );
};

export default UserProfile;