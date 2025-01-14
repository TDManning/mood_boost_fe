import "./HomePage.css";
import "./FloatingCircles.css";
import FloatingCircles from "./FloatingCircles";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function HomePage() {
  const navigate = useNavigate(); 
  const [result, setResult] = useState("");

  const options = [
    { label: "Inspiring Quote", route: "/quote" },
    { label: "Breathing Exercise", route: "/breathing" },
    { label: "Joke Generator", route: "/joke" },
  ];

  const spinWheel = () => {

  const spinner = document.querySelector(".basic-spinner");
  spinner.classList.add("active"); 

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * options.length); 
    const selectedOption = options[randomIndex]; 
    setResult(selectedOption.label);
    navigate(selectedOption.route);
  
    spinner.classList.remove("active");
  }, 500); 
};

  return (
    <div className="home-page-wrapper">
      <div className="home-page">
      <FloatingCircles />
        <h1 className="animated-title">Welcome to Mood Boost</h1>
        <h2>
          Mood Boost offers simple breathing exercises, inspiring quotes, and a
          touch of humor to brighten your day and put a smile on your face.
        </h2>
        <p>Click below to see a random page or use the menu to navigate to different pages</p>
        <div className="basic-spinner" onClick={spinWheel}>
          <div className="spinner-outer"></div>
          <p className="spinner-text"></p>
        </div>
      </div>
    </div>
  );
}
export default HomePage;