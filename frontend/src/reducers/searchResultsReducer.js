import { createSlice } from '@reduxjs/toolkit'

import assetsService from '../services/assets'

const initialState = {
  assets: null,
  assetCount: 0,
  lastNameSearchTerm: '',
  lastPopular: false,
  lastPage: 0,
  lastUser: 0,
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

export const search = (nameSearchTerm, popular, user, page, pageSize) => {
  return async (dispatch, getState) => {
    dispatch(clearSearchResults())
    const response = await assetsService.search(nameSearchTerm, popular, user, page, pageSize)
    dispatch(setSearchResults({
      assets: response.rows,
      assetCount: response.count,
      lastNameSearchTerm: nameSearchTerm,
      lastPopular: popular,
      lastUser: user,
      lastPage: page,
      lastPageSize: pageSize,
    }))
  }
}

export const shouldSearchAgain = (state, nameSearchTerm, popular, user, page, pageSize) => {
  return state.assets == null ||
         state.lastNameSearchTerm != nameSearchTerm ||
         state.lastPopular != popular ||
         state.lastPage != page ||
         state.lastPageSize != pageSize ||
         state.lastUser != user
}

export const { setSearchResults, clearSearchResults } = searchResultsSlice.actions
export default searchResultsSlice.reducer
