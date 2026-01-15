import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Shaka from 'shaka-player'
import { Title, Divider } from '@mantine/core'

import assetsService from '../services/assets'
import { registerAssetDetails } from '../reducers/assetDetailsReducer'
import CommentForm from './CommentForm'
import DynamicCommentList from './DynamicCommentList'

const AssetPanel = () => {
  const dispatch = useDispatch()
  const id = useParams().assetId
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
    assetsService.get(id).then(result => {
      setAsset(result)
      // Also store some basic details, so other panels can see them.
      dispatch(registerAssetDetails(result.name))
    })
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
      <Title order={3}>{asset.name}</Title>
      <audio controls ref={mediaElement} />
      <DynamicCommentList getTimestamp={getTimestamp} comments={comments} />
      <Divider />
      <CommentForm getTimestamp={getTimestamp} addComment={addComment} />
    </div>
  )
}

export default AssetPanel
