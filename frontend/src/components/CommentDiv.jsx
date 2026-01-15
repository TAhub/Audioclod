import { Card, Text, Transition, Group } from '@mantine/core'
import { Link } from 'react-router-dom'

import UserAvatar from './UserAvatar'

const CommentDiv = ({ comment, visible }) => (
  <Transition mounted={visible} transition="fade-right" duration={250} timingFunction="ease" >
    {(transitionStyle) => (
      <Card shadow="sm" padding="lg" radius="md" withBorder style={transitionStyle}>
        <Card.Section withBorder>
          <Group>
            <Link to={'/users/' + comment.user.id }>
              <UserAvatar user={comment.user} />
            </Link>
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

export default CommentDiv
