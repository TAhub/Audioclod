import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createTheme, MantineProvider } from '@mantine/core'

import App from './App.jsx'
import store from './store'

const theme = createTheme({
  // TODO: theme overrides
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>,
)
