import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'

import { search, clearSearchResults, shouldSearchAgain } from '../reducers/searchResultsReducer'

const AccountPanel = ({ homePanelMode }) => {
  const dispatch = useDispatch()
  const [nameSearchTerm, setNameSearchTerm] = useState('')
  const searchResults = useSelector(state => state.searchResults)
  const [page, setPage] = useState(0)
  const startSearchTimer = useCallback(debounce(() => {
    dispatch(clearSearchResults())
  }, 500), [])

  useEffect(() => {
    const newPopular = homePanelMode
    const newNameSearchTerm = newPopular ? '' : nameSearchTerm
    const newPage = newPopular ? 0 : page
    if (shouldSearchAgain(searchResults, newNameSearchTerm, newPopular, newPage)) {
      dispatch(search(newNameSearchTerm, newPopular, newPage))
    }
  }, [searchResults, homePanelMode])

  const handleNameSearchTermChange = (event) => {
    setNameSearchTerm(event.target.value)
    setPage(0)
    startSearchTimer()
  }

  const makePageChangeButton = (delta) => {
    return (event) => {
      event.preventDefault()
      const newPage = Math.max(0, page + delta)
      if (newPage != page) {
        setPage(newPage)
        startSearchTimer()
      }
    }
  }

  return (
    <div>
      {homePanelMode ? null : <form>
        <div>
          <label>
            Name <input type="text" value={nameSearchTerm} onChange={handleNameSearchTermChange} />
          </label>
        </div>
      </form>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Length</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.assets ? searchResults.assets.map(asset =>
            <tr key={asset.id}>
              <td><Link to={'/assets/' + asset.id}>{asset.name}</Link></td>
              <td>{asset.genre}</td>
              <td>{asset.length + 's'}</td>
              <td>{asset.numComments}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
      {homePanelMode ? null : <form>
        <button onClick={makePageChangeButton(-1)} disabled={page <= 0}>{"<"}</button>
        Page {page + 1}
        <button onClick={makePageChangeButton(1)}>{">"}</button>
      </form>}
    </div>
  )
}

export default AccountPanel