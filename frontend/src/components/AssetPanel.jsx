import { useParams } from 'react-router-dom'
import { useState } from 'react'

import assetsService from '../services/assets'
import CommentDiv from './CommentDiv'
import CommentForm from './CommentForm'

const AssetPanel = () => {
  const id = useParams().id
  const [asset, setAsset] = useState(null)
  const [comments, setComments] = useState(null)

  if (!asset) {
    assetsService.get(id).then(result =>
      setAsset(result)
    )
    return null
  }
  if (!comments) {
    assetsService.getComments(id).then(result =>
      setComments(result)
    )
    return null
  }

  const getTimestamp = () => 0 // TODO: get timestamp from playback
  const addComment = (newComment) => {
    setComments([...comments, newComment])
  }

  return (
    <div>
      <h4>{asset.name}</h4>
      <list>
        {comments.map(comment =>
          <li id={comment.id}>
            <CommentDiv comment={comment} />
          </li>
        )}
      </list>
      <CommentForm getTimestamp={getTimestamp} addComment={addComment} />
    </div>
  )
}

export default AssetPanel
