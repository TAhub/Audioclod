import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './reducers/loginReducer'
import searchResultsReducer from './reducers/searchResultsReducer'

const store = configureStore({
  reducer: {
    login: loginReducer,
    searchResults: searchResultsReducer
  }
})

export default store