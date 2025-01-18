import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import QuotePage from './QuotePage/QuotePage';
import JokePage from './JokePage/JokePage';
import BreathingPage from './BreathingPage/BreathingPage';
import HomePage from './HomePage/HomePage';
import UserProfile from './UserProfile/UserProfile'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)

  const userId = sessionStorage.getItem("userId") || null;

  function logUserActivity(userId, activityId) {
    const payload = {
      user_activity: {
        user_id: userId,
        activity_id: activityId,
      },
    };
    fetch(`http://localhost:5000/api/v1/users/${userId}/activities`, {
      method: 'POST',
      body: JSON.stringify({
        activity_id: activityId
      }),
      headers: {
        'Content-Type': 'application/json'
        }
    })
      .then(async (response) => {
        console.log(response)
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
      }
      return response.json()
      })
        .catch((error) => {
          console.log(error)
      })
  }

  return (
    <>
      < NavBar user={user} setUser={setUser}/>
      <div className="page-content">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/quote" element={<QuotePage user={user || 19} logUserActivity={logUserActivity}/>} />
        <Route path="/joke" element={<JokePage user={user || 19} logUserActivity={logUserActivity}/>} />
        <Route path="/breathing" element={<BreathingPage user={user || 19} logUserActivity={logUserActivity}/>} />
        <Route path="/user" element={<UserProfile user={user || 19} />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
