import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import AccountPanel from './components/AccountPanel'
import SearchPanel from './components/SearchPanel'
import UsersPanel from './components/UsersPanel'

function App() {
  const account = useSelector(state => state.account)

  const linkStyle = { padding: 5 }

  // Technically, a user could short-circuit this, in order to see the admin tab.
  // However, they can't actually perform any admin actions, so even if they do it's
  // only a user list.
  const showAdmin = account && account.admin

  return (
    <Router>
      <div>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/account">{account ? 'Account' : 'Log In'}</Link>
        <Link style={linkStyle} to="/assets">Search</Link>
        {showAdmin ? <Link style={linkStyle} to="/users">Users</Link> : null}
      </div>
      <Routes>
        <Route path="/" element={<div>TODO: home</div>} />
        <Route path="/account" element={account ? <AccountPanel /> : <LoginForm />} />
        <Route path="/assets" element={<SearchPanel />} />
        <Route path="/assets/:id" element={<div>TODO: asset view</div>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/users" element={<UsersPanel />} />
      </Routes>
    </Router>
  )
}

export default App
