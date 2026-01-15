const baseUrl = 'http://localhost:3003/api/'

const getAll = async () => {
  const response = await fetch(baseUrl + 'users', {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Failed to get users')
  }

  return await response.json()
}

const get = async (id) => {
  const response = await fetch(baseUrl + 'users/' + id, {
    method: 'GET'
  })

  if (!response.ok) {
    throw new Error('Failed to get users')
  }

  return await response.json()
}

const deactivate = async (id, token) => {
  const response = await fetch(baseUrl + 'users/' + id + '/deactivate', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  })

  if (!response.ok) {
    throw new Error('Failed to deactivate')
  }
}

const login = async (username, password) => {
  const response = await fetch(baseUrl + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('Failed to log in')
  }

  return await response.json()
}

const register = async (username, password) => {
  const response = await fetch(baseUrl + 'users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('Failed to register user')
  }

  return await response.json()
}

export default { login, register, getAll, get, deactivate }
