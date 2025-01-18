import { X, UserRound, KeyRound, Mail, PersonStanding } from 'lucide-react';
import './Modal.css'
import { useState, useEffect } from 'react';
import validator from 'validator';

function Modal({modalOpen, onClose, resetToSignIn, onLoginSuccess, setUser}) {
  const [createAccount, setCreateAccount] = useState(false) 
  const [first_name, setFirstname] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    clearFields()
    clearMessage()
  }, [modalOpen])

  function createNewUser() {
    const endpoint = createAccount ? 'https://mood-boost-be.onrender.com/api/v1/users' : 'https://mood-boost-be.onrender.com/api/v1/sessions'

    const body = createAccount ? JSON.stringify({ user: { first_name, username, password, email, password_confirmation }}) : JSON.stringify({ username, password })

    fetch(endpoint, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
        }
      })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
      }
      console.log(response)
      return response.json()
      })
        .then((data) => {
          const userId = data.data.id
          const userUserName = data.data.attributes.username
          setUser(userId)
          setUserName(userUserName)
          onLoginSuccess(userId, userUserName)
          setSuccessMessage(createAccount ? 'User created successfully. You are logged in.' : 'You are logged in')
          setErrorMessage('')
          onClose();
      })
        .catch((error) => {
          if (error.errors && error.errors[0]?.detail) {
            setErrorMessage(error.errors[0].detail)
            setSuccessMessage('')
        } else {
          setErrorMessage(createAccount ? 'Failed to create user. Please try again.' : 'Unable to log in. Please try again.')
          setSuccessMessage('')
        }
      })
  }

  function clearFields() {
    setFirstname('')
    setUserName('')
    setPassword('')
    setPasswordConfirmation('')
    setEmail('')
  }

  function clearMessage() {
    setErrorMessage('')
    setSuccessMessage('')
  }

  useEffect(() => {
    if (resetToSignIn) {
      setCreateAccount(false)
    }
  }, [resetToSignIn])

  function handleSubmit(e) {
    e.preventDefault()

    if (createAccount) {
      if (validator.isEmail(email) && validator.isStrongPassword(password) && first_name.length <= 20) {
        createNewUser()
        clearFields()
        } else {
          if (!validator.isEmail(email)) {
            setSuccessMessage('')
            setErrorMessage('Invalid email address')
        } else if (!validator.isStrongPassword(password)) {
          setSuccessMessage('')
          setErrorMessage('Your password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol')
        } else if (!first_name.length <= 20) {
          setSuccessMessage('')
          setErrorMessage('First name cannot exceed 20 characters')
        }
      }
    } else {
      if (username && password) {
        createNewUser() 
        clearFields()
      } else {
        setSuccessMessage('')
        setEmail('Both username and password are required')
      }
    }
  }

  if (!modalOpen) return null

  return (
    <div className="modal"> 
      <div className="sign-in">
        <button className="close-modal" onClick={() => {
          onClose()
          clearMessage()
          clearFields()
        }}>
          <X />
        </button>
        <h1>{createAccount ? 'Create Account' : 'Sign In'}</h1>
      </div>
      <form onSubmit={handleSubmit}>
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
          {createAccount ? 'Submit' : 'Login'}
        </button>
        <div className="need-account">
          <button onClick={() => {
            setCreateAccount(!createAccount) 
            clearMessage()
          }}>
            {createAccount ? 'Back to Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default Modal