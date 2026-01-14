import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mantine/core'

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
      <h4>{account.username}</h4>
      <Button onClick={handleLogoutButton}>Log Out</Button>
    </div>
  )
}

export default AccountPanel