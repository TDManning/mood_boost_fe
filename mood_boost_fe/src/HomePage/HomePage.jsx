import "./HomePage.css";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Wheel } from "react-spinning-wheel";
import "react-spinning-wheel/dist/style.css";


function HomePage() {
  const navigate = useNavigate()
console.log(Wheel)
  const pages = [
    { id: 1, label: "Inspiring Quote", route: "/quote" },
    { id: 2, label: "Breathing Exercise", route: "/breathing" },
    { id: 3, label: "Joke Generator", route: "/joke" },
  ]

  const handleSpinResult = (resultLabel) => {
    const result = pages.find((page) => page.label === resultLabel)
    if (result) {
      navigate(result.route);
    }
  }
  return (
    <div className="home-page">
      <h1>Welcome to MoodBoost</h1>
      <h2>
        Mood Boost offers simple breathing exercises, inspiring quotes, and a touch of humor to brighten your day and put a smile on your face.
      </h2>
      <p>Spin the wheel or use the menu to navigate to different pages</p>
      <section className="spinner-container">
        <Wheel
        data={pages.map((page) => page.label)}
        onStopSpinning={handleSpinResult}
        />
      </section>
    </div>
  )
}

export default HomePage;