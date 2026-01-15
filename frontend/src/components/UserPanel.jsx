import { Title, Group } from '@mantine/core'
import { useParams } from 'react-router-dom'

import SearchPanel from './SearchPanel'
import UserAvatar from './UserAvatar'

const UserPanel = ({ user, extraElement }) => {
  let derivedUser = user
  if (!user) {
    const id = useParams().userId
    console.log('fetching user data at', id)
    // TODO: fetch user data
    return null
  }
  
  // TODO: show avatar (re-use code from comment div...) in group with the name
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
