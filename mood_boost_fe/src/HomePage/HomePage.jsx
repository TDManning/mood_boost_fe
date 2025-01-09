import "./HomePage.css";
import { Link } from 'react-router-dom';

function HomePage() {
  return (
      <div className="home-page">
        <h1>Welcome to MoodBoost</h1>
        <p>Spin the wheel or use the menu to navigate to different pages</p>
        {/* <SpinnerWheel /> */}
      </div>
  )
}

export default HomePage;