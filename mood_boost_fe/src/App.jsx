import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import QuotePage from './QuotePage/QuotePage';
import JokePage from './JokePage/JokePage';
import BreathingPage from './BreathingPage/BreathingPage';
import HomePage from './HomePage/HomePage';
import UserProfile from './UserProfile/UserProfile';
import { useState, useEffect } from 'react';

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api/v1"
    : "https://mood-boost-be.onrender.com/api/v1";

function App() {
  const [user, setUser] = useState(sessionStorage.getItem("userId") || null);

  useEffect(() => {
    const initializeGuestUser = async () => {
      if (!user) {
        try {
          console.log("Fetching guest user...");
          const response = await fetch(`${API_BASE_URL}/guest_user`);

          if (!response.ok) {
            console.error("Failed to fetch guest user. Status:", response.status);
            throw new Error("Guest user creation failed");
          }

          const data = await response.json();
          sessionStorage.setItem("userId", data.guest_id);
          setUser(data.guest_id);
          console.log("✅ Guest user assigned:", data.guest_id);
        } catch (error) {
          console.error("❌ Error fetching guest user:", error);
        }
      }
    };

    initializeGuestUser();
  }, [user]);

  function logUserActivity(userId, activityName) {
    if (!userId || !activityName) {
      console.warn("⚠️ Missing userId or activityName for logging activity.");
      return;
    }

    fetch(`${API_BASE_URL}/users/${userId}/activities`, {
      method: 'POST',
      body: JSON.stringify({
        activity: {
          name: activityName,
          description: "User performed an activity." 
        }
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
        }
        return response.json();
      })
      .then((data) => {
        console.log("✅ Activity logged successfully:", data);
      })
      .catch((error) => {
        console.error("❌ Error logging activity:", error);
      });
  }

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quote" element={<QuotePage user={user} logUserActivity={logUserActivity} />} />
          <Route path="/joke" element={<JokePage user={user} logUserActivity={logUserActivity} />} />
          <Route path="/breathing" element={<BreathingPage user={user} logUserActivity={logUserActivity} />} />
          <Route path="/user" element={<UserProfile user={user} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

