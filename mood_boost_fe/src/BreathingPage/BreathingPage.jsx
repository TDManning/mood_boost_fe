import FloatingCircles from "../HomePage/FloatingCircles";
import "./BreathingPage.css";
import { useState } from "react";


function BreathingPage() {
  const [isBreathing, setIsBreathing] = useState(false);

  const handleStartBreathing = () => {
    setIsBreathing(true);
  }

  return (
      <div>
        <h2>Breathe in and out as the circle expands and contracts</h2>
          <section className="breathing-page">
              <FloatingCircles className="background"/>
              {!isBreathing && (
                  <button id="start-button" className="start-button"
                onClick={handleStartBreathing}
                >Start Breathing Exercise</button>
              )}
                {isBreathing && (
                    <div className="breathing-circle"></div>
                )}
        </section>
      </div>
  );
}

export default BreathingPage;