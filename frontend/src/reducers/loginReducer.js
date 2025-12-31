import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    clearLogin(state, action) {
      return null
    },
  },
})

export const login = (username, password) => {
  return async (dispatch, getState) => {
    const response = await loginService.login(username, password)
    dispatch(setLogin({ username, token: response.token }))
  }
}

export const { setLogin, clearLogin } = loginSlice.actions
export default loginSlice.reducer
