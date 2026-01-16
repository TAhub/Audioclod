import { useState, useEffect } from 'react'
import { Group } from '@mantine/core'

import CommentDiv from './CommentDiv'

const chooseCommentsToShow = (comments, timestamp) => {
  const displayedComments = {}
  // Filter the comments by distance to the current timestamp; don't show stuff that
  // is after the current timestamp, or too far before.
  for (const comment of comments) {
    if (comment.timestamp <= timestamp) {
      const age = timestamp - comment.timestamp
      if (age <= 5) {
        displayedComments[comment.id] = true
      }
    }
  }
  return displayedComments
}

const DynamicCommentList = ({ comments, getTimestamp }) => {
  const [displayedComments, setDisplayedComments] = useState({})

  // Sort the comments, so they show in a sane order.
  const sortedComments = [...comments]
  sortedComments.sort((a, b) => {
    if (b.timestamp != a.timestamp) {
      // Comments should be ordered by timestamp first, so stuff later in the asset are on top.
      return b.timestamp - a.timestamp
    }
    // If timestamp is equal, newer comments should be on the top.
    return b.id - a.id
  })

  // Poll the displayed comments periodically, to see if they have changed.
  // This is necessary because management of the player is not under the control
  // of React.
  useEffect(() => {
    const tick = () => {
      const timestamp = getTimestamp()
      const newDisplayedComments = chooseCommentsToShow(sortedComments, timestamp)
      setDisplayedComments(newDisplayedComments)
    }
    // Set up the interval (and clear it on shutdown).
    const interval = setInterval(tick, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <Group>
      {sortedComments.map(comment =>
        <CommentDiv comment={comment} key={comment.id} visible={displayedComments[comment.id]} />
      )}
    </Group>
  )
}

export default DynamicCommentList
