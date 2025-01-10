import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import homebtn from '../icons/home.png';
import HomePage from "../HomePage/HomePage";
import BreathingPage from '../BreathingPage/BreathingPage';
import QuotePage from '../QuotePage/QuotePage';
import JokePage from '../JokePage/JokePage';
import Modal from '../Modal/Modal';
import { useState, useEffect } from 'react';

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
                <li>Mood Boosts
                    <ul className="dropdown">
                        <li><NavLink to="/breathing" element={ BreathingPage } className="boost">Breathing Exercies</NavLink></li>
                        <li><NavLink to="/quote" element={ QuotePage } className="boost">Inspirational Quotes</NavLink></li>
                        <li><NavLink to="/joke" element={ JokePage } className="boost">Joke Generator</NavLink></li>
                    </ul>
                </li>    
            </ul>
        <button className="login" onClick={handleOpenModal}>Login/Register</button>
        </nav>
        <Modal modalOpen={modalOpen} onClose={handleCloseModal} />
      </div>
    )
}

export default NavBar;