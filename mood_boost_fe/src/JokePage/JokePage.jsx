// import './JokePage.css';
// import { useState, useEffect }  from 'react';

// function JokePage({joke, user, logUserActivity}) {
//   const [currentJoke, setJoke] = useState(null);
//   const [error, setError] = useState(null);

//   function handleClick() {
//     logUserActivity(user, 4)
//   }

//   useEffect(() => {
//     getjoke()
//   }, [])


//   function getjoke() {
//     fetch(`https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`, {
//       method: 'GET', 
//       headers: {'Content-Type': 'application/json'}
//     }
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Failed to fetch Jokes. Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       if (data.type === 'single') {
//         setJoke(data.joke);
//       } else {
//         setJoke(`${data.setup} - ${data.delivery}`);
//       }
//     })
//     .catch(error => setError('Something went wrong. There was an issue coming up with something humorous to say.  Please try again in a few minutes.'))
//     ;}

//     if (error) {
//       return <p className="error-message">{error}</p>;
//     }
//       return (
//         <div className="joke-page">
//             <h1>Joke Page</h1>
//           <section className="joke-area">
//             <h3>{currentJoke}</h3>
//           </section> 
//                 <button className='get-joke' aria-label="get a joke" onClick={() => {
//                   getjoke()
//                   handleClick()
//                 }
//                 }
//                 >
//                   Tell Me A Joke
//                 </button>
//         </div>
//     )
//   }

// export default JokePage;


import './JokePage.css';
import { useState, useEffect, useRef } from 'react';

function JokePage({ joke, user, logUserActivity }) {
  const [currentJoke, setJoke] = useState(null);
  const [error, setError] = useState(null);
  const fetchCalled = useRef(false); // Add the ref to track fetch calls

  function handleClick() {
    logUserActivity(user, 4);
  }

  // Updated useEffect
  useEffect(() => {
    console.log('useEffect triggered');
    if (!fetchCalled.current) {
      console.log('Fetching joke...');
      getjoke(); // Fetch the joke only once
      fetchCalled.current = true; // Mark fetch as completed
    }
  }, []);

  function getjoke() {
    fetch(
      `https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Jokes. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.type === 'single') {
          setJoke(data.joke);
        } else {
          setJoke(`${data.setup} - ${data.delivery}`);
        }
      })
      .catch(() =>
        setError(
          'Something went wrong. There was an issue coming up with something humorous to say. Please try again in a few minutes.'
        )
      );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="joke-page">
      <h1>Joke Page</h1>
      <section className="joke-area">
        <h3>{currentJoke}</h3>
      </section>
      <button
        className="get-joke"
        aria-label="get a joke"
        onClick={() => {
          getjoke();
          handleClick();
        }}
      >
        Tell Me A Joke
      </button>
    </div>
  );
}

export default JokePage;
