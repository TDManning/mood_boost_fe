import "./HomePage.css";
import { NavLink } from 'react-router-dom';

function HomePage() {
  const handleSpin = () => {
    const pages = ["Inspiring Quote", "Breathing Exercise", "Joke"];
    const result = pages[Math.floor(Math.random() * pages.length)];
    alert('You got : ${result}'); //temporary
  };
  return (
      <div className="home-page">
        <h1>Welcome to MoodBoost</h1>
        <h2>
          Mood Boost offers simple breathing exercises, inspiring quotes, and a touch of humor to brighten your day and put a smile on your face.
        </h2>
        <p>Spin the wheel or use the menu to navigate to different pages</p>
        {/* <SpinnerWheel /> */}
        <NavLink to="/spin" className="spin-link">
          <button className="spin-btn">Spin the Wheel</button>
        </NavLink>
      </div>
  )
}

export default HomePage;