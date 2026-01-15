import { Card, Text, Transition, Group, Avatar } from '@mantine/core'

const CommentDiv = ({ comment, visible }) => {
  const defaultAvatar = comment.user.username.slice(0, 2).toUpperCase()
  return (
    <Transition mounted={visible} transition="fade-right" duration={250} timingFunction="ease" >
      {(transitionStyle) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={transitionStyle}>
          <Card.Section withBorder>
            <Group>
              <Avatar color="blue" radius="xl">{defaultAvatar}</Avatar>
              <Text size="lg" fw={700}>{comment.user.username}</Text>
              <Text size="lg" fs="italic">{comment.timestamp}s</Text>
            </Group>
          </Card.Section>
          <Card.Section>
            <Text size="md">{comment.content}</Text>
          </Card.Section>
        </Card>
      )}
    </Transition>
  )
}

export default CommentDiv
