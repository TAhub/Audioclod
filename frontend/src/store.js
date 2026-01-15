import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './reducers/accountReducer'
import searchResultsReducer from './reducers/searchResultsReducer'
import assetDetailsReducer from './reducers/assetDetailsReducer'

const store = configureStore({
  reducer: {
    account: accountReducer,
    searchResults: searchResultsReducer,
    assetDetails: assetDetailsReducer
  }
})

export default store