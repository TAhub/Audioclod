import { createSlice } from '@reduxjs/toolkit'

const activeViewDetailsSlice = createSlice({
  name: 'activeView',
  initialState: {name: '', username: ''},
  reducers: {
    setActiveViewDetails(state, action) {
      return {...state, ...action.payload}
    },
  },
})

export const registerActiveViewDetails = (details) => {
  return async (dispatch, getState) => {
    dispatch(setActiveViewDetails(details))
  }
}

export const { setActiveViewDetails } = activeViewDetailsSlice.actions
export default activeViewDetailsSlice.reducer
