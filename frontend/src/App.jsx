import {
  Routes, Route, useNavigate, useMatch, Link,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppShell, Title, NavLink } from '@mantine/core'
import { IconVinyl, IconRegistered } from '@tabler/icons-react'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import AccountPanel from './components/AccountPanel'
import SearchPanel from './components/SearchPanel'
import UsersPanel from './components/UsersPanel'
import AssetPanel from './components/AssetPanel'

function App() {
  const account = useSelector(state => state.account)
  const assetDetails = useSelector(state => state.assetDetails)
  const navigate = useNavigate()
  // TODO: if I update to the new version of React Router, this won't be necessary:
  const inHome = useMatch('/')
  const inLogin = useMatch('/account')
  const inSearch = useMatch('/assets')
  const inAdmin = useMatch('/users')
  const inAsset = useMatch('/assets/:id')
  const inHomeAsset = useMatch('/home/:id')
  const inRegister = useMatch('/register')

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
  const assetIcon = <IconVinyl size={16} stroke={1.5} />
  const registerIcon = <IconRegistered size={16} stroke={1.5} />

  return (
    <AppShell padding="md" header={header} navbar={navbar}>
      <AppShell.Header>
        <Title order={1}>AUDIOCLOD</Title>
        <Title order={3}>A learning project made by Theodore Abshire</Title>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavLink label="Home" active={inHome || inHomeAsset} component={Link} to="/" />
        {inHomeAsset ? <NavLink label={assetDetails.name} leftSection={assetIcon} active={true} component={Link} to={inHomeAsset.pathname} /> : null}
        <NavLink label={account ? 'Account' : 'Log In'} active={inLogin || inRegister} component={Link} to="/account" />
        {inRegister ? <NavLink label="Register" active={true} leftSection={registerIcon} component={Link} to="/register" /> : null}
        <NavLink label="Search" active={inSearch || inAsset} component={Link} to="/assets" />
        {inAsset ? <NavLink label={assetDetails.name} leftSection={assetIcon} active={true} component={Link} to={inAsset.pathname} /> : null}
        {showAdmin ? <NavLink label="Admin Console" active={inAdmin} component={Link} to="/users" /> : null}
      </AppShell.Navbar>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<SearchPanel homePanelMode={true} />} />
          <Route path="/account" element={account ? <AccountPanel /> : <LoginForm />} />
          <Route path="/assets" element={<SearchPanel homePanelMode={false} />} />
          <Route path="/assets/:id" element={<AssetPanel />} />
          <Route path="/home/:id" element={<AssetPanel />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/users" element={<UsersPanel />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
