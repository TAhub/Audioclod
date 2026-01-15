import {
  Routes, Route, useNavigate, useMatch,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppShell, Title, NavLink } from '@mantine/core'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import AccountPanel from './components/AccountPanel'
import SearchPanel from './components/SearchPanel'
import UsersPanel from './components/UsersPanel'
import AssetPanel from './components/AssetPanel'

function App() {
  const account = useSelector(state => state.account)
  const navigate = useNavigate()
  // TODO: if I update to the new version of React Router, this won't be necessary:
  const inHome = useMatch('/')
  const inLogin = useMatch('/account')
  const inSearch = useMatch('/assets')
  const inAdmin = useMatch('/users')

  // Technically, a user could short-circuit this, in order to see the admin tab.
  // However, they can't actually perform any admin actions, so even if they do it's
  // only a user list.
  const showAdmin = account && account.admin

  const header = {
    height: 80,
  }
  const navbar = {
    width: 200,
    breakpoint: 'sm',
    collapsed: { mobile: false, desktop: false },
  }
  const makeNav = (url) => {
    return () => navigate(url)
  }

  return (
    <AppShell padding="md" header={header} navbar={navbar}>
      <AppShell.Header>
        <Title order={1}>AUDIOCLOD</Title>
        <Title order={3}>A learning project made by Theodore Abshire</Title>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavLink label="Home" active={inHome} onClick={makeNav('/')} />
        <NavLink label={account ? 'Account' : 'Log In'} active={inLogin} onClick={makeNav('/account')} />
        <NavLink label="Search" active={inSearch} onClick={makeNav('/assets')} />
        {showAdmin ? <NavLink label="Admin Console" active={inAdmin} onClick={makeNav('/users')} /> : null}
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
    </AppShell>
  )
}

export default App
