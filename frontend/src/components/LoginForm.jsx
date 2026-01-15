import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextInput, PasswordInput, Button } from '@mantine/core'

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
    <>
      <TextInput label="Username" value={username} onChange={event => setUsername(event.target.value)} />
      <PasswordInput label="Password" value={password} onChange={event => setPassword(event.target.value)} />
      <Button onClick={handleLoginButton} data-disabled={disableButton}>Log In</Button>
      <div>
        <Link to="/register">Don't have an account? Register!</Link>
      </div>
    </>
  )
}

export default LoginForm