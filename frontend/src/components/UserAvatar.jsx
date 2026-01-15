import { Avatar } from '@mantine/core'

const UserAvatar = ({ user }) => {
  const defaultAvatar = user.username.slice(0, 2).toUpperCase()
  return (
    <Avatar color="blue" radius="xl">{defaultAvatar}</Avatar>
  )
}

export default UserAvatar