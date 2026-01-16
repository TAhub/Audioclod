import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TextInput, Button, Title } from '@mantine/core'

import assetsService from '../services/assets'

const CommentForm = ({ getTimestamp, addComment }) => {
  const id = useParams().id
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  const [content, setContent] = useState(null)

  if (!account) {
    return (
      <>
        <Title order={3}>Post a comment?</Title>
        <Link to="/account">You have to Log In before you can comment!</Link>
      </>
    )
  }

  const handleCommentButton = (event) => {
    event.preventDefault()
    assetsService.comment(id, content, getTimestamp(), account.token).then(newComment => {
      addComment(newComment)
    })
    setContent('')
  }

  const disableButton = !content

  return (
    <>
      <Title order={3}>Post a comment?</Title>
      <TextInput placeholder="Type your comment!" maw={700} value={content} onChange={event => setContent(event.target.value)} />
      <Button onClick={handleCommentButton} data-disabled={disableButton}>Post Comment</Button>
    </>
  )
}

export default CommentForm
