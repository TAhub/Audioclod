import { createSlice } from '@reduxjs/toolkit'

import accountService from '../services/account'

const accountSlice = createSlice({
  name: 'account',
  initialState: null,
  reducers: {
    setAccount(state, action) {
      return action.payload
    },
    clearAccount(state, action) {
      return null
    },
  },
})

export const login = (username, password) => {
  return async (dispatch, getState) => {
    const response = await accountService.login(username, password)
    dispatch(setAccount(response))
  }
}

export const register = (username, password) => {
  return async (dispatch, getState) => {
    const registerResponse = await accountService.register(username, password)
    // And then automatically log in.
    const loginResponse = await accountService.login(username, password)
    dispatch(setAccount({ username, token: loginResponse.token }))
  }
}

export const { setAccount, clearAccount } = accountSlice.actions
export default accountSlice.reducer
