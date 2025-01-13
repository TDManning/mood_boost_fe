import "./NavBar.css";
import { LogIn } from 'lucide-react';
import homebtn from '../icons/home.png';
import HomePage from "../HomePage/HomePage";
import BreathingPage from '../BreathingPage/BreathingPage';
import QuotePage from '../QuotePage/QuotePage';
import JokePage from '../JokePage/JokePage';
import Modal from '../Modal/Modal';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const pageContent = document.querySelector('.page-content')
    const modal = document.querySelector('.modal')
    if (modalOpen) {
      pageContent.classList.add('blur')
      modal.classList.remove('blur')
    } else {
      pageContent.classList.remove('blur')
    }
  }, [modalOpen])

  function handleOpenModal() {
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

    return (
      <div>
        <nav className="navbar">
            <NavLink to="/" element={ HomePage } className="home">
                <img className="homebtn" src={ homebtn } alt="Back to home page" />
            </NavLink>
            <ul>
            <li>
              <span className="mood-boosts-title">Mood Boosts</span>
              <ul className="dropdown">
                <li><NavLink to="/breathing">Breathing Exercises</NavLink></li>
                <li><NavLink to="/quote">Inspirational Quotes</NavLink></li>
                <li><NavLink to="/joke">Joke Generator</NavLink></li>
            </ul>
            </li>
          </ul>
        <button className="login" onClick={handleOpenModal}>
          <LogIn className="login-icon" />Login/Register
        </button>
        </nav>
        <Modal modalOpen={modalOpen} onClose={handleCloseModal} />
      </div>
    )
}

export default NavBar;