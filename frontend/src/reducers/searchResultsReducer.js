import { createSlice } from '@reduxjs/toolkit'

import assetsService from '../services/assets'

const initialState = {
  assets: null,
  assetCount: 0,
  lastNameSearchTerm: '',
  lastPopular: false,
  lastPage: 0,
  lastPageSize: 0,
}

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setSearchResults(state, action) {
      return action.payload
    },
    clearSearchResults(state, action) {
      return initialState
    },
  },
})

export const search = (nameSearchTerm, popular, page, pageSize) => {
  return async (dispatch, getState) => {
    dispatch(clearSearchResults())
    const response = await assetsService.search(nameSearchTerm, popular, page, pageSize)
    dispatch(setSearchResults({
      assets: response.rows,
      assetCount: response.count,
      lastNameSearchTerm: nameSearchTerm,
      lastPopular: popular,
      lastPage: page,
      lastPageSize: pageSize,
    }))
  }
}

export const shouldSearchAgain = (state, nameSearchTerm, popular, page, pageSize) => {
  if (state.assets == null) {
    return true
  }
  return state.lastNameSearchTerm != nameSearchTerm || state.lastPopular != popular || state.lastPage != page || state.lastPageSize != pageSize
}

export const { setSearchResults, clearSearchResults } = searchResultsSlice.actions
export default searchResultsSlice.reducer
