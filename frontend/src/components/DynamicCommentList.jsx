import { useState, useEffect } from 'react'

import CommentDiv from './CommentDiv'

const commentArraysAreDifferent = (a, b) => {
  if (a.length != b.length) {
    return true
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i].id != b[i].id || a[i].fadeState != b[i].fadeState) {
      return true
    }
  }
  return false
}

const getAge = (comment, timestamp) => {
  return (timestamp - comment.timestamp) * 0.2
}

const generateNewDisplayedComments = (comments, timestamp) => {
  // Copy the individual comments over, since we will be modifying these objects.
  let newDisplayedComments = comments.map((comment) => {
    return { ...comment }
  })
  // Filter the comments by distance to the current timestamp; don't show stuff that
  // is after the current timestamp, or too far before.
  newDisplayedComments = newDisplayedComments.filter((comment) => {
    if (comment.timestamp > timestamp) {
      return false
    }
    return getAge(comment, timestamp) <= 1
  })
  // Sort the comments.
  newDisplayedComments.sort((a, b) => {
    if (b.timestamp != a.timestamp) {
      // Comments should be ordered by timestamp first, so stuff later in the asset are on top.
      return b.timestamp - a.timestamp
    }
    // If timestamp is equal, newer comments should be on the top.
    return b.id - a.id
  })
  // Attach display metadata to the comments.
  for (const comment of newDisplayedComments) {
    const age = getAge(comment, timestamp)
    if (age <= 0.1) {
      comment.fadeState = 0
    } else if (age > 0.9) {
      comment.fadeState = 2
    } else {
      comment.fadeState = 1
    }
  }
  return newDisplayedComments
}

const DynamicCommentList = ({ comments, getTimestamp }) => {
  let [displayedComments, setDisplayedComments] = useState([])

  // Poll the displayed comments periodically, to see if they have changed.
  // This is necessary because management of the player is not under the control
  // of React.
  useEffect(() => {
    const tick = () => {
      const timestamp = getTimestamp()
      const newDisplayedComments = generateNewDisplayedComments(comments, timestamp)
      // Only update the displayedComments state if it has actually changed.
      if (commentArraysAreDifferent(displayedComments, newDisplayedComments)) {
        setDisplayedComments(newDisplayedComments)
        // Annoyingly, this closure captures the original state of displayedComments,
        // so I have to update the local value here even though that is bad practice.
        displayedComments = newDisplayedComments
      }
    }
    // Set up the interval (and clear it on shutdown).
    const interval = setInterval(tick, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <list>
      {displayedComments.map(comment =>
        <CommentDiv comment={comment} key={(comment.id * 10) + comment.fadeState} />
      )}
    </list>
  )
}

export default DynamicCommentList
