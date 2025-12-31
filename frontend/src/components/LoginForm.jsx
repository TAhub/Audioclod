import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { login } from '../reducers/accountReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginButton = (event) => {
    event.preventDefault()
    // TODO: validate or disable button until username and password are filled
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  const disableButton = !username || !password

  return (
    <form>
      <div>
        <label>
          Username <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password <input type="text" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleLoginButton} disabled={disableButton}>Log In</button>
      </div>
      <div>
        <Link to="/register">Don't have an account? Register!</Link>
      </div>
    </form>
  )
}

export default LoginForm