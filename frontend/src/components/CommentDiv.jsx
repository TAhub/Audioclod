import { Card, Text, Transition, Group } from '@mantine/core'

const CommentDiv = ({ comment, visible }) => {
  return (
    <Transition mounted={visible} transition="fade-right" duration={250} timingFunction="ease" >
      {(transitionStyle) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={transitionStyle}>
          <Card.Section withBorder>
            <Group>
              <Text size="lg" fw={700}>{comment.user.username}</Text>
              <Text size="lg">at {comment.timestamp}s</Text>
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
