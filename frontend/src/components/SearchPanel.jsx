import { useSelector, useDispatch } from 'react-redux'

import { search } from '../reducers/searchResultsReducer'

const AccountPanel = () => {
  const dispatch = useDispatch()
  const searchResults = useSelector(state => state.searchResults)

  if (!searchResults) {
    // TODO: add searching...
    dispatch(search())
    return null
  }

  return (
    <div>
      <div>TODO: search terms</div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(asset =>
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>{asset.genre}</td>
              <td>{asset.length + 's'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AccountPanel