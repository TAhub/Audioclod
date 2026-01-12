import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

import { search, clearSearchResults } from '../reducers/searchResultsReducer'

const AccountPanel = () => {
  const dispatch = useDispatch()
  const [nameSearchTerm, setNameSearchTerm] = useState('')
  const searchResults = useSelector(state => state.searchResults)
  const startSearchTimer = useCallback(debounce(() => {
    dispatch(clearSearchResults())
  }, 500), [])

  useEffect(() => {
    // searchResults being an empty array means "no results"
    // searchResults being null means "must perform search"
    if (!searchResults) {
      dispatch(search(nameSearchTerm))
    }
  }, [searchResults])

  const handleNameSearchTermChange = (event) => {
    setNameSearchTerm(event.target.value)
    startSearchTimer()
  }

  return (
    <div>
      <form>
        <div>
          <label>
            Name <input type="text" value={nameSearchTerm} onChange={handleNameSearchTermChange} />
          </label>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Length</th>
          </tr>
        </thead>
        <tbody>
          {searchResults ? searchResults.map(asset =>
            <tr key={asset.id}>
              <td><Link to={'/assets/' + asset.id}>{asset.name}</Link></td>
              <td>{asset.genre}</td>
              <td>{asset.length + 's'}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}

export default AccountPanel