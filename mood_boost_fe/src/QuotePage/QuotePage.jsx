import "./QuotePage.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function QuotePage() {
  const [quote, setQuote] = useState(null)

  function fetchQuote() {
    fetch(`http://api.quotable.io/quotes/random?tags=happiness`)
    .then(response=> {
      if (!response.ok) {
        throw new Error("Failed to fetch quote")
      }
      return response.json()
    })
    .then(data => {
      setQuote(data[0])
      console.log(data)
    })
    .catch(error => {
      console.error("Error fetching quote", error)
    })
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="quote-page">
      <h1>Quote Page</h1>
      {quote ? (
        <>
          <h3>{quote.content}</h3>
          <p>{quote.author}</p>
          <button className="new-quote" onClick={fetchQuote}>New Quote</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default QuotePage;