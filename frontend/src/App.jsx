import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'

function App() {
  const linkStyle = { padding: 5 }

  return (
    <Router>
      <div>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/login">Login</Link>
        <Link style={linkStyle} to="/assets">Search</Link>
      </div>
      <Routes>
        <Route path="/" element={<div>TODO: home</div>} />
        <Route path="/login" element={<div>TODO: login</div>} />
        <Route path="/assets" element={<div>TODO: asset search</div>} />
        <Route path="/assets/:id" element={<div>TODO: asset view</div>} />
      </Routes>
    </Router>
  )
}

export default App
