import { useParams } from 'react-router-dom'
import { useState } from 'react'

import assetsService from '../services/assets'

const AssetPanel = () => {
  const id = useParams().id
  const [asset, setAsset] = useState(null)

  if (!asset) {
    assetsService.get(id).then(result =>
      setAsset(result)
    )
    return null
  }

  console.log(asset)

  return (
    <div>
      <h4>{asset.name}</h4>
    </div>
  )
}

export default AssetPanel
