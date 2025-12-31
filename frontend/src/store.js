import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './reducers/accountReducer'
import searchResultsReducer from './reducers/searchResultsReducer'

const store = configureStore({
  reducer: {
    account: accountReducer,
    searchResults: searchResultsReducer
  }
})

export default store