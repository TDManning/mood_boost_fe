import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import QuotePage from './QuotePage/QuotePage';
import JokePage from './JokePage/JokePage';
import BreathingPage from './BreathingPage/BreathingPage';
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <>
      < NavBar />
      <div className="page-content">
      {/* <NavBar /> */}
      <Routes>
        {/* Define HomePage as the landing page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/joke" element={<JokePage />} />
        <Route path="/breathing" element={<BreathingPage />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
