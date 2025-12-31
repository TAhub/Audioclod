import { createSlice } from '@reduxjs/toolkit'

import assetsService from '../services/assets'

const searchResultsSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setSearchResults(state, action) {
      return action.payload
    },
    clearSearchResults(state, action) {
      return null
    },
  },
})

export const search = () => {
  return async (dispatch, getState) => {
    const response = await assetsService.search()
    dispatch(setSearchResults(response))
  }
}

export const { setSearchResults, clearSearchResults } = searchResultsSlice.actions
export default searchResultsSlice.reducer
