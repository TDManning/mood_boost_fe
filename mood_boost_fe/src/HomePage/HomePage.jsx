import "./HomePage.css";
import { Link } from 'react-router-dom';

function HomePage() {
  return (
      <div className="home-page">
        <h1>Welcome to MoodBoost</h1>
        <h2>Mood Boost offers simple breathing exercises, inspiring quotes, and a touch of humor to brighten your day and put a smile on your face.</h2>
        <p>Spin the wheel or use the menu to navigate to different pages</p>
        {/* <SpinnerWheel /> */}
      </div>
  )
}

export default HomePage;