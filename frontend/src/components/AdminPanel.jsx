import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button, Table, NavLink } from '@mantine/core'

import accountService from '../services/account'

const AdminPanel = () => {
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
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>username</Table.Th>
          <Table.Th>admin</Table.Th>
          <Table.Th>active</Table.Th>
          <Table.Th>actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map(user =>
          <Table.Tr key={user.id}>
            <Table.Td><NavLink to={'/users/' + user.id} component={Link} label={user.username} /></Table.Td>
            <Table.Td>{user.admin ? 'YES' : 'NO'}</Table.Td>
            <Table.Td>{user.active ? 'YES' : 'NO'}</Table.Td>
            <Table.Td>
              <Button onClick={() => disableUser(user)} data-disabled={!user.active}>Deactivate</Button>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  )
}

export default AdminPanel
