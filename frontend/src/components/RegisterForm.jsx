import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { register } from '../reducers/accountReducer'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const account = useSelector(state => state.account)

  if (account) {
    navigate('/')
  }

  const handleLoginButton = (event) => {
    event.preventDefault()
    // TODO: validate or disable button until username and password are filled
    dispatch(register(username, password))
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

export default RegisterForm