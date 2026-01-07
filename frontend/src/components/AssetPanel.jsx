import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Shaka from 'shaka-player'

import assetsService from '../services/assets'
import CommentDiv from './CommentDiv'
import CommentForm from './CommentForm'

const AssetPanel = () => {
  const id = useParams().id
  const [asset, setAsset] = useState(null)
  const [comments, setComments] = useState(null)
  const [player, setPlayer] = useState(new Shaka.Player())
  const [preload, setPreload] = useState(null)
  const mediaElement = useRef(null)

  // Start loading the content.
  useEffect(() => {
    if (!preload && asset) {
      player.preload(asset.contentUri).then((manager) => {
        setPreload(manager)
      })
    }
  }, [asset])
  // Attach and finish the load. This is a separate effect, so that it doesn't have to happen right away
  // (e.g. if it's taking a while to load the comments for some reason).
  useEffect(() => {
    if (preload && mediaElement && mediaElement.current) {
      player.attach(mediaElement.current).then(() => {
        player.load(preload).then(() => {
          mediaElement.current.play()
        })
      })
    }
  }, [preload, mediaElement, mediaElement.current])

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

  const getTimestamp = () => {
    return Math.round(mediaElement?.current?.currentTime ?? 0)
  }
  const addComment = (newComment) => {
    setComments([...comments, newComment])
  }

  return (
    <div>
      <h4>{asset.name}</h4>
      <audio controls ref={mediaElement} />
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
