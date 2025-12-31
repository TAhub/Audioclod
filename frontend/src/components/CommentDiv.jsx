const CommentDiv = ({ comment }) => {
  return (
    <>
      <div>
        <b>{comment.userId}</b> {comment.timestamp}s
      </div>
      <div>
        {comment.content}
      </div>
    </>
  )
}

export default CommentDiv
