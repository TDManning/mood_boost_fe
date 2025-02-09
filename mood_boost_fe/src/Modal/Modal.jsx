import { X, UserRound, KeyRound, Mail, PersonStanding } from 'lucide-react';
import './Modal.css';
import { useState, useEffect } from 'react';
import validator from 'validator';

function Modal({ modalOpen, onClose, resetToSignIn, onLoginSuccess, setUser }) {
  const [createAccount, setCreateAccount] = useState(false);
  const [first_name, setFirstname] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldError, setFieldError] = useState({});
  const [showPasswordNote, setShowPasswordNote] = useState(false); 

  useEffect(() => {
    clearFields();
    clearMessage();
  }, [modalOpen]);

  function createNewUser() {
    const endpoint = createAccount
      ? 'https://mood-boost-be.onrender.com/api/v1/users'
      : 'https://mood-boost-be.onrender.com/api/v1/sessions';

    const body = createAccount
      ? JSON.stringify({ user: { first_name, username, password, email, password_confirmation }})
      : JSON.stringify({ username, password });

    fetch(endpoint, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
        }
        return response.json();
      })
      .then((data) => {
        const userId = data.data.id;
        const userUserName = data.data.attributes.username;
        setUser(userId);
        setUserName(userUserName);
        onLoginSuccess(userId, userUserName);
        setSuccessMessage(createAccount ? 'User created successfully. You are logged in.' : 'You are logged in');
        setErrorMessage('');
        onClose();
      })
      .catch((error) => {
        setErrorMessage(error.errors?.[0]?.detail || 'Something went wrong. Try again.');
        setSuccessMessage('');
      });
  }

  function clearFields() {
    setFirstname('');
    setUserName('');
    setPassword('');
    setPasswordConfirmation('');
    setEmail('');
    setFieldError({});
    setShowPasswordNote(false);
  }

  function clearMessage() {
    setErrorMessage('');
    setSuccessMessage('');
  }

  useEffect(() => {
    if (resetToSignIn) {
      setCreateAccount(false);
    }
  }, [resetToSignIn]);

  function handleSubmit(e) {
    e.preventDefault();
    let errors = {};

    if (createAccount) {
      if (!validator.isStrongPassword(password)) {
        errors.password = 'Password must be at least 8 characters, with 1 uppercase, 1 number, and 1 symbol';
      }
      if (first_name.length > 20) {
        errors.first_name = 'First name cannot exceed 20 characters';
      }
    } else {
      if (!username) {
        errors.username = 'Username is required';
      }
      if (!password) {
        errors.password = 'Password is required';
      }
    }

    setFieldError(errors);
    if (Object.keys(errors).length === 0) {
      createNewUser();
      clearFields();
    }
  }

  if (!modalOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}><X /></button>
        <h1 className="modal-title">{createAccount ? 'Create Account' : 'Sign In'}</h1>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-container">
            {createAccount && (
              <>
                <div className="input-with-icon">
                  <PersonStanding className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="First Name (optional)" 
                    value={first_name} 
                    onChange={(e) => setFirstname(e.target.value)} 
                  />
                </div>
                {fieldError.first_name && <p className="field-error">{fieldError.first_name}</p>}
              </>
            )}
  
            <div className="input-with-icon">
              <UserRound className="input-icon" />
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUserName(e.target.value)} 
              />
            </div>
            {fieldError.username && <p className="field-error">{fieldError.username}</p>}
  
            <div className="input-with-icon">
              <KeyRound className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordNote(true)} 
                onBlur={() => setShowPasswordNote(false)}  
              />
            </div>
            {createAccount && showPasswordNote && (
              <p className="password-note">
                Password must be at least 8 characters, with 1 uppercase, 1 number, and 1 symbol
              </p>
            )}
            
            {fieldError.password && <p className="field-error">{fieldError.password}</p>}
  
            {createAccount && (
              <>
                <div className="input-with-icon">
                  <KeyRound className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={password_confirmation} 
                    onChange={(e) => setPasswordConfirmation(e.target.value)} 
                  />
                </div>
                <div className="input-with-icon">
                  <Mail className="input-icon" />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </>
            )}
          </div>
          <div className="messages">
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </div>
          <div className="button-container">
            <button className="login-submit" type="submit">
              {createAccount ? 'Create Account' : 'Login'}
            </button>
            <button 
              className="toggle-account" 
              type="button" 
              onClick={() => setCreateAccount(!createAccount)}
            >
              {createAccount ? 'Back to Sign In' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
}

export default Modal;
