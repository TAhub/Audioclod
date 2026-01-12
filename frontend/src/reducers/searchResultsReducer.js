import { createSlice } from '@reduxjs/toolkit'

import assetsService from '../services/assets'

const initialState = {
  assets: null,
  lastNameSearchTerm: '',
  lastPopular: false,
  lastPage: 0,
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

export const search = (nameSearchTerm, popular, page) => {
  return async (dispatch, getState) => {
    dispatch(clearSearchResults())
    const response = await assetsService.search(nameSearchTerm, popular, page)
    dispatch(setSearchResults({
      assets: response,
      lastNameSearchTerm: nameSearchTerm,
      lastPopular: popular,
      lastPage: page,
    }))
  }
}

export const shouldSearchAgain = (state, nameSearchTerm, popular, page) => {
  return state.assets == null || state.lastNameSearchTerm != nameSearchTerm || state.lastPopular != popular || state.lastPage != page
}

export const { setSearchResults, clearSearchResults } = searchResultsSlice.actions
export default searchResultsSlice.reducer
