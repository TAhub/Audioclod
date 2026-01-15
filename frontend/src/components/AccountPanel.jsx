import { useSelector, useDispatch } from 'react-redux'
import { Button, Title } from '@mantine/core'

import UserPanel from './UserPanel'
import { clearAccount } from '../reducers/accountReducer'

const AccountPanel = () => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)

  const handleLogoutButton = (event) => {
    event.preventDefault()
    dispatch(clearAccount())
  }

  return (
    <UserPanel user={account} extraElement={<Button onClick={handleLogoutButton}>Log Out</Button>} />
  )
}

export default AccountPanel