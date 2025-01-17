import "./NavBar.css";
import { LogIn, LogOut } from 'lucide-react';
import homebtn from '../icons/home.png';
import HomePage from "../HomePage/HomePage";
import Modal from '../Modal/Modal';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({user, setUser}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [username, setUserName] = useState('')

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

  function handleLogout() {
    setUser(null)
    setUserName('')
    console.log("User Logged Out")
  }

  function handleLoginSuccess(userId, userUserName) {
    setUser(userId)
    setUserName(userUserName)
  }

    return (
      <div className="navbar-wrapper">
        <nav className="navbar">
            <NavLink to="/" element={ HomePage } className="home">
                <img className="homebtn" src={ homebtn } alt="Back to home page" />
            </NavLink>
            <ul>
            <li>
              <span className="mood-boosts-title">Mood Boosts</span>
              <ul className="dropdown">
                <li><NavLink to="/breathing" className='navbar_boosts breathing'>Breathing Exercises</NavLink></li>
                <li><NavLink to="/quote" className='navbar_boosts quote'>Inspirational Quotes</NavLink></li>
                <li><NavLink to="/joke" className='navbar_boosts joke'>Joke Generator</NavLink></li>
                <li><NavLink to="/user" className='navbar_boosts user'>User History</NavLink></li>
              </ul>
            </li>
          </ul>
          <button 
            className="login" 
            onClick={user ? handleLogout : handleOpenModal}
            >
              {user ? (
              <div>
                <LogOut className="logout-icon" />
                Logged in as {username}. 
                <br></br> 
                Logout
              </div>
              ) : (
                <div>
                  <LogIn className="login-icon" />
                  Login/Register
                  </div>
              )}
          </button>
        </nav>
        <Modal modalOpen={modalOpen}
          onClose={handleCloseModal} 
          resetToSignIn={modalOpen}
          onLoginSuccess={handleLoginSuccess}
          user={user}
          setUser={setUser}
          setUserName={setUserName}
          />
      </div>
    )
}

export default NavBar;