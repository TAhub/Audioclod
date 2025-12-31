import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import assetsService from '../services/assets'

const CommentForm = ({ getTimestamp, addComment }) => {
  const id = useParams().id
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  const [content, setContent] = useState(null)

  if (!account) {
    return (
      <>
        <h4>Post a comment?</h4>
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
      <h4>Post a comment?</h4>
      <form>
        <div>
          <label>
            <input type="text" value={content} onChange={event => setContent(event.target.value)} />
          </label>
        </div>
        <div>
          <button onClick={handleCommentButton} disabled={disableButton}>Post Comment</button>
        </div>
      </form>
    </>
  )
}

export default CommentForm
