import { Title, Group } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import SearchPanel from './SearchPanel'
import UserAvatar from './UserAvatar'
import accountService from '../services/account'

const UserPanel = ({ user, extraElement }) => {
  const [derivedUser, setDerivedUser] = useState(user)
  const id = useParams().userId
  useEffect(() => {
    if (!user) {
      accountService.get(id).then(result => {
        setDerivedUser(result)
      })
    }
  }, [user])
  if (!derivedUser) {
    return null
  }
  return (
    <div>
      <Group>
        <UserAvatar user={derivedUser} />
        <Title order={3}>{derivedUser.username}</Title>
        {extraElement}
      </Group>
      <SearchPanel userForUserPanelMode={derivedUser} />
    </div>
  )
}

export default UserPanel
