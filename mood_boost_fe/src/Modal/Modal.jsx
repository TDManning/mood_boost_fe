import { X } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { Mail } from 'lucide-react';
import { PersonStanding } from 'lucide-react';
import './Modal.css'
import { useState } from 'react';

function Modal({modalOpen, onClose}) {
  const [createAccount, setCreateAccount] = useState(false) 

  if (!modalOpen) return null

  return (
    <div className="modal">
      <div className="sign-in">
        <button className="close-modal" onClick={onClose}>
          <X />
        </button>
        <h1>{createAccount ? 'Create Account' : 'Sign In'}</h1>
      </div>
      <form>
        <div className="input-container">
          {createAccount && (
            <div className="input-with-icon">
              <input
                className="first-name"
                type="text"
                placeholder="Enter your first name (optional)"
                required
              />
              <span className="user-icon">
              <PersonStanding />
            </span>
            </div>
          )}
          <div className="input-with-icon">
            <input
              className="username"
              type="text"
              placeholder="Enter your username"
              required
            />
            <span className="user-icon">
              <UserRound />
            </span>
          </div>
          <div className="input-with-icon">
            <input
              className="password"
              type="password"
              placeholder="Enter your password"
              required
            />
            <span className="password-icon">
              <KeyRound />
            </span>
          </div>
          {createAccount && (
            <div className="input-with-icon">
              <input
                className="email"
                type="email"
                placeholder="Enter your email"
                required
              />
              <span className="password-icon">
              <Mail />
            </span>
            </div>
          )}
        </div>
      </form>
      <div className="submit">
        <button className="login-submit">
          {createAccount ? 'Sign Up' : 'Login'}
        </button>
        <div className="need-account">
          <button onClick={() => setCreateAccount(!createAccount)}>
            {createAccount ? 'Back to Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal