const CommentDiv = ({ comment }) => {
  return (
    <>
      <div>
        <b>{comment.user.username}</b> {comment.timestamp}s
      </div>
      <div>
        {comment.content}
      </div>
    </>
  )
}

export default CommentDiv
