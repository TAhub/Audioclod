import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import accountService from '../services/account'

const UsersPanel = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState(null)
  const account = useSelector(state => state.account)

  useEffect(() => {
    accountService.getAll().then(result =>
      setUsers(result)
    )
  }, [])

  if (!users) {
    return null
  }

  const disableUser = (user) => {
    accountService.deactivate(user.id, account.token).then(() => {
      accountService.getAll().then(result =>
        setUsers(result)
      )
    })
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>admin</th>
            <th>active</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.admin ? 'YES' : 'NO'}</td>
              <td>{user.active ? 'YES' : 'NO'}</td>
              <td>
                <button onClick={() => disableUser(user)} disabled={!user.active}>Deactivate</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPanel
