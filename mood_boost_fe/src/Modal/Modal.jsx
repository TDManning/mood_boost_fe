import { X } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import './Modal.css'
import { useState } from 'react';

function Modal({modalOpen, onClose}) {

  if (!modalOpen) return null

  return ( 
    <div className="modal">
      <div className="sign-in">
        <button className="close-modal" onClick={onClose}><X /></button>
        <h1>Sign In</h1>
      </div>
      <form>
        <div className='input-container'>
          <div className="input-with-icon">
            <input
              className='username'
              type="text"
              placeholder="enter your username"
              required
            />
            <span class="user-icon"><UserRound /></span>
          </div>
          <div className="input-with-icon">
            <input
              className='password'
              type="text"
              placeholder="enter your password"
              required
            />
            <span class="password-icon"><KeyRound /></span>
          </div>
        </div>
      </form>
      <div className="submit">
        <button className="login-submit">Login</button>
        <div className="need-account">
          <button>Create Account</button>
        </div>
      </div>      
    </div>
  )
}

export default Modal