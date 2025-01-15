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
        <section class="breathing-page">
            <FloatingCircles class="background"/>
            {!isBreathing && (
                <button id="start-button" classname="start-button"
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
