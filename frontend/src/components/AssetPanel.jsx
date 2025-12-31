import { useParams } from 'react-router-dom'
import { useState } from 'react'

import assetsService from '../services/assets'
import CommentDiv from './CommentDiv'

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
    </div>
  )
}

export default AssetPanel
