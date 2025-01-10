import { X } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import './Modal.css'
import { useState } from 'react';

function Modal({modalOpen, onClose}) {

  if (!modalOpen) return null

  return ( 
    <div className="modal">
      <button className="close-modal" onClick={onClose}><X /></button>
      <h1>Sign In</h1>
      <form>
        <div className='input-container'>
          <div>
            <input
              className='username'
              type="text"
              placeholder="enter your username"
              required
            />
            <span class="user-icon"><UserRound /></span>
          </div>
          <div>
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