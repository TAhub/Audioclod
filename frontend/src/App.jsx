import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import AccountPanel from './components/AccountPanel'

function App() {
  const login = useSelector(state => state.login)

  const linkStyle = { padding: 5 }

  return (
    <Router>
      <div>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/account">{login ? 'Account' : 'Log In'}</Link>
        <Link style={linkStyle} to="/assets">Search</Link>
      </div>
      <Routes>
        <Route path="/" element={<div>TODO: home</div>} />
        <Route path="/account" element={login ? <AccountPanel /> : <LoginForm />} />
        <Route path="/assets" element={<div>TODO: asset search</div>} />
        <Route path="/assets/:id" element={<div>TODO: asset view</div>} />
      </Routes>
    </Router>
  )
}

export default App
