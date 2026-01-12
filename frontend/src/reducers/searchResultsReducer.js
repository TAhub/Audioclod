import { createSlice } from '@reduxjs/toolkit'

import assetsService from '../services/assets'

const initialState = {
  assets: null,
  lastNameSearchTerm: '',
  lastPopular: false,
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

export const search = (nameSearchTerm, popular) => {
  return async (dispatch, getState) => {
    dispatch(clearSearchResults())
    const response = await assetsService.search(nameSearchTerm, popular)
    dispatch(setSearchResults({
      assets: response,
      lastNameSearchTerm: nameSearchTerm,
      lastPopular: popular,
    }))
  }
}

export const shouldSearchAgain = (state, nameSearchTerm, popular) => {
  return state.assets == null || state.lastNameSearchTerm != nameSearchTerm || state.lastPopular != popular
}

export const { setSearchResults, clearSearchResults } = searchResultsSlice.actions
export default searchResultsSlice.reducer
