import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import QuotePage from './QuotePage/QuotePage';
import JokePage from './JokePage/JokePage';
import BreathingPage from './BreathingPage/BreathingPage';
import HomePage from './HomePage/HomePage';
import UserProfile from './UserProfile/UserProfile'

function App() {
  return (
    <>
      < NavBar />
      <div className="page-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/joke" element={<JokePage />} />
        <Route path="/breathing" element={<BreathingPage />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
