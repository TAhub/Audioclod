import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

import App from './App.jsx'
import store from './store'

const theme = createTheme({
  // TODO: theme overrides
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <MantineProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </MantineProvider>
    </Router>
  </StrictMode>,
)
