import { useSelector, useDispatch } from 'react-redux'

import { clearLogin } from '../reducers/loginReducer'

const AccountPanel = () => {
  const login = useSelector(state => state.login)

  const handleLogoutButton = (event) => {
    event.preventDefault()
    dispatch(clearLogin())
  }

  return (
    <div>
      <h4>{login.username}</h4>
      <button onClick={handleLogoutButton}>Log Out</button>
    </div>
  )
}

export default AccountPanel