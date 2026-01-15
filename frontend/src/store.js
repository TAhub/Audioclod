import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './reducers/accountReducer'
import searchResultsReducer from './reducers/searchResultsReducer'
import activeViewDetailsReducer from './reducers/activeViewDetailsReducer'

const store = configureStore({
  reducer: {
    account: accountReducer,
    searchResults: searchResultsReducer,
    activeViewDetails: activeViewDetailsReducer
  }
})

export default store