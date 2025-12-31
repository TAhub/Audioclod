import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import { login } from '../reducers/loginReducer'

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
      <button onClick={handleLoginButton} disabled={disableButton}>Log In</button>
    </form>
  )
}

export default LoginForm