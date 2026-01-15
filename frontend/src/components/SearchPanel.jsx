import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import { Pagination, TextInput, Table, NavLink } from '@mantine/core'

import { search, clearSearchResults, shouldSearchAgain } from '../reducers/searchResultsReducer'

const AccountPanel = ({ homePanelMode }) => {
  const dispatch = useDispatch()
  const [nameSearchTerm, setNameSearchTerm] = useState('')
  const pageSize = 4 // TODO: const...
  const searchResults = useSelector(state => state.searchResults)
  const maxPage = Math.ceil((searchResults.assetCount) / pageSize)
  const [page, setPage] = useState(1)
  const startSearchTimer = useCallback(debounce(() => {
    dispatch(clearSearchResults())
  }, 500), [])

  useEffect(() => {
    const newPopular = homePanelMode
    const newNameSearchTerm = newPopular ? '' : nameSearchTerm
    const newPage = (newPopular ? 0 : page) - 1
    if (shouldSearchAgain(searchResults, newNameSearchTerm, newPopular, newPage, pageSize)) {
      dispatch(search(newNameSearchTerm, newPopular, newPage, pageSize))
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
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Genre</Table.Th>
            <Table.Th>Length</Table.Th>
            <Table.Th>Comments</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {searchResults.assets ? searchResults.assets.map(asset =>
            <Table.Tr key={asset.id}>
              <Table.Td><NavLink to={'/assets/' + asset.id} component={Link} label={asset.name} /></Table.Td>
              <Table.Td>{asset.genre}</Table.Td>
              <Table.Td>{asset.length + 's'}</Table.Td>
              <Table.Td>{asset.numComments}</Table.Td>
            </Table.Tr>
          ) : null}
        </Table.Tbody>
      </Table>
      {homePanelMode ? null : <Pagination total={maxPage} value={page} onChange={setPageAndSearch} />}
    </div>
  )
}

export default AccountPanel