import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { TextInput, PasswordInput, Button } from '@mantine/core'

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

  const handleRegisterButton = (event) => {
    event.preventDefault()
    // TODO: validate or disable button until username and password are filled
    dispatch(register(username, password))
    setUsername('')
    setPassword('')
  }

  const disableButton = !username || !password

  return (
    <>
      <TextInput label="Username" value={username} onChange={event => setUsername(event.target.value)} />
      <PasswordInput label="Password" value={password} onChange={event => setPassword(event.target.value)} />
      <Button onClick={handleRegisterButton} data-disabled={disableButton}>Register</Button>
    </>
  )
}

export default RegisterForm