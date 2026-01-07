const CommentDiv = ({ comment }) => {
  const style = {}
  switch (comment.fadeState) {
    case 0:
      style.backgroundColor = '#eee'
      break
    case 1:
      style.backgroundColor = '#fff'
      break
    case 2:
      style.backgroundColor = '#ddd'
      break
  }
  return (
    <li style={style}>
      <div>
        <b>{comment.user.username}</b> {comment.timestamp}s
      </div>
      <div>
        {comment.content}
      </div>
    </li>
  )
}

export default CommentDiv
