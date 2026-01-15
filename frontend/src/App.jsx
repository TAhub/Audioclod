import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppShell, Title } from '@mantine/core'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import AccountPanel from './components/AccountPanel'
import SearchPanel from './components/SearchPanel'
import UsersPanel from './components/UsersPanel'
import AssetPanel from './components/AssetPanel'

function App() {
  const account = useSelector(state => state.account)

  const linkStyle = { padding: 5 }

  // Technically, a user could short-circuit this, in order to see the admin tab.
  // However, they can't actually perform any admin actions, so even if they do it's
  // only a user list.
  const showAdmin = account && account.admin

  const header = {
    height: 80,
  }
  const navbar = {
    width: 250,
    breakpoint: 'sm',
    collapsed: { mobile: false, desktop: false },
  }

  return (
    <AppShell padding="md" header={header} navbar={navbar}>
      <Router>
        <AppShell.Header>
          <Title order={1}>AUDIOCLOD</Title>
          <Title order={3}>A learning project made by Theodore Abshire</Title>
        </AppShell.Header>
        <AppShell.Navbar>
          <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/account">{account ? 'Account' : 'Log In'}</Link>
          <Link style={linkStyle} to="/assets">Search</Link>
          {showAdmin ? <Link style={linkStyle} to="/users">Users</Link> : null}
        </AppShell.Navbar>
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<SearchPanel homePanelMode={true} />} />
            <Route path="/account" element={account ? <AccountPanel /> : <LoginForm />} />
            <Route path="/assets" element={<SearchPanel homePanelMode={false} />} />
            <Route path="/assets/:id" element={<AssetPanel />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/users" element={<UsersPanel />} />
          </Routes>
        </AppShell.Main>
      </Router>
    </AppShell>
  )
}

export default App
