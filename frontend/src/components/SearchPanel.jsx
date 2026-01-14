import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import { Pagination, TextInput } from '@mantine/core'

import { search, clearSearchResults, shouldSearchAgain } from '../reducers/searchResultsReducer'

const AccountPanel = ({ homePanelMode }) => {
  const dispatch = useDispatch()
  const [nameSearchTerm, setNameSearchTerm] = useState('')
  const searchResults = useSelector(state => state.searchResults)
  const maxPage = 10
  const [page, setPage] = useState(1)
  const startSearchTimer = useCallback(debounce(() => {
    dispatch(clearSearchResults())
  }, 500), [])

  useEffect(() => {
    const newPopular = homePanelMode
    const newNameSearchTerm = newPopular ? '' : nameSearchTerm
    const newPage = (newPopular ? 0 : page) - 1
    if (shouldSearchAgain(searchResults, newNameSearchTerm, newPopular, newPage)) {
      dispatch(search(newNameSearchTerm, newPopular, newPage))
    }
  }, [searchResults, homePanelMode])

  const handleNameSearchTermChange = (event) => {
    setNameSearchTerm(event.target.value)
    setPage(1)
    startSearchTimer()
  }

  const setPageAndSearch = (newPage) => {
    if (newPage != page) {
      setPage(newPage)
      startSearchTimer()
    }
  }

  return (
    <div>
      {homePanelMode ? null : <TextInput placeholder="Search" value={nameSearchTerm} onChange={handleNameSearchTermChange} />}
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
      {homePanelMode ? null : <Pagination total={maxPage} value={page} onChange={setPageAndSearch} />}
    </div>
  )
}

export default AccountPanel