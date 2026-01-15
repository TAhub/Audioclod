import { useSelector, useDispatch } from 'react-redux'
import { Button, Title } from '@mantine/core'

import { clearAccount } from '../reducers/accountReducer'

const AccountPanel = () => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)

  const handleLogoutButton = (event) => {
    event.preventDefault()
    dispatch(clearAccount())
  }

  return (
    <div>
      <Title order={3}>{account.username}</Title>
      <Button onClick={handleLogoutButton}>Log Out</Button>
    </div>
  )
}

export default AccountPanel