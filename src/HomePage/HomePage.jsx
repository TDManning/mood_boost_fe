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
    <>
    <FloatingCircles /> 
      <div className="home-page-wrapper">
        <div className="home-page">
          <h1 className="animated-title">Welcome to Mood Boost</h1>
          <h2>Your happy space for uplifting moments!</h2>
          <p>Click below for a surprise boost</p>
          <div className="basic-spinner" onClick={spinWheel}>
        <div className="spinner-outer"></div>
      </div>
    </div>
  </div>
</>
  );
}
export default HomePage;