import "./HomePage.css";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "react-spinning-wheel/dist/style.css";


function HomePage() {
  const navigate = useNavigate(); 
  const [result, setResult] = useState("");

  const options = [
    { label: "Inspiring Quote", route: "/quote" },
    { label: "Breathing Exercise", route: "/breathing" },
    { label: "Joke Generator", route: "/joke" },
  ];

  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * options.length); 
    const selectedOption = options[randomIndex]; 
    setResult(selectedOption.label);
    navigate(selectedOption.route);
  };

  return (
    <div className="home-page">
      <h1>Welcome to MoodBoost</h1>
      <h2>
        Mood Boost offers simple breathing exercises, inspiring quotes, and a touch of humor to brighten your day and put a smile on your face.
      </h2>
      <p>Spin the wheel or use the menu to navigate to different pages</p>
      <div className="basic-spinner" onClick={spinWheel}>
        <p>Spin Me!</p>
      </div>
      {result && <p className="result">You got: {result}</p>}
    </div>
  )
}

export default HomePage;