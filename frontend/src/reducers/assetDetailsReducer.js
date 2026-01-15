import { createSlice } from '@reduxjs/toolkit'

const assetDetailsSlice = createSlice({
  name: 'asset',
  initialState: {name: ''},
  reducers: {
    setAssetDetails(state, action) {
      return action.payload
    },
  },
})

export const registerAssetDetails = (name) => {
  return async (dispatch, getState) => {
    dispatch(setAssetDetails({name}))
  }
}

export const { setAssetDetails } = assetDetailsSlice.actions
export default assetDetailsSlice.reducer
