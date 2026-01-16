import { Avatar } from '@mantine/core'
import { Link } from 'react-router-dom'

const UserAvatar = ({ user, isLink }) => {
  const defaultAvatar = user.username.slice(0, 2).toUpperCase()
  const avatar = (
    <Avatar color="blue" radius="xl">{defaultAvatar}</Avatar>
  )
  if (isLink) {
    return (
      <Link to={'/users/' + user.id }>
        {avatar}
      </Link>
    )
  } else {
    return avatar
  }
}

export default UserAvatar