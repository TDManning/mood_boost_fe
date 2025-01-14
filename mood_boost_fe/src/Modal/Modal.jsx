import { X, UserRound, KeyRound, Mail, PersonStanding } from 'lucide-react';
import './Modal.css'
import { useState, useEffect } from 'react';

function Modal({modalOpen, onClose, resetToSignIn}) {
  const [createAccount, setCreateAccount] = useState(false) 
  const [first_name, setFirstname] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

function createNewUser() {
  if (createAccount && (!username || !password || !password_confirmation || !email)) {
  setErrorMessage("Username, password, password confirmation, and email are required")
  return
  }
  if (!createAccount && (!username || !password)) {
  setErrorMessage("Username and password are required")
  return
  }

  const endpoint = createAccount ? 'http://localhost:3000/api/v1/users' : 'http://localhost:3000/api/v1/sessions'

  const body = createAccount ? JSON.stringify({ user: { first_name, username, password, email, password_confirmation }}) : JSON.stringify({ username, password })

  fetch(endpoint, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response)
      if (!response.ok) throw new Error('Unsuccessful network response')
      return response.json()
    })
      .then(() => {
        createAccount ? setSuccessMessage('User created successfully') : setSuccessMessage('You are logged in')
        setErrorMessage('')
    })
      .catch((error) => {
        createAccount ? setErrorMessage('Failed to create user. Please try again later.') : setErrorMessage('Unable to log in. Please try again later.')
        console.error('Error:', error)
    })
  }

    useEffect(() => {
      if (resetToSignIn) {
        setCreateAccount(false)
      }
    }, [resetToSignIn])

    if (!modalOpen) return null

    return (
      <div className="modal"> 
        <div className="sign-in">
          <button className="close-modal" onClick={onClose}>
            <X />
          </button>
          <h1>{createAccount ? 'Create Account' : 'Sign In'}</h1>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          createNewUser()
        }}>
          <div className="input-container">
            {createAccount && (
              <div className="input-with-icon">
                <input
                  className="first-name"
                  type="text"
                  placeholder="Enter your first name (optional)"
                  value={first_name}
                  onChange={(e) => setFirstname(e.target.value)}
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
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="password-icon">
                <KeyRound />
              </span>
            </div>
            {createAccount && (
              <div className="input-with-icon">
              <input
                className="password"
                type="password"
                placeholder="Confirm your password"
                required
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <span className="password-icon">
                <KeyRound />
              </span>
            </div>
            )}
            {createAccount && (
              <div className="input-with-icon">
                <input
                  className="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="password-icon">
                <Mail />
              </span>
              </div>
            )}
          </div>
        <div className="messages">
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </div>
        <div className="submit">
          <button className="login-submit" type="submit">
            {createAccount ? 'Sign Up' : 'Login'}
          </button>
          <div className="need-account">
            <button onClick={() => setCreateAccount(!createAccount)}>
              {createAccount ? 'Back to Sign In' : 'Create Account'}
            </button>
          </div>
        </div>
        </form>
      </div>
    );
  }

export default Modal