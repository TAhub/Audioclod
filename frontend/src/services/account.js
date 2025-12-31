const baseUrl = 'http://localhost:3003/api/'

const login = async (username, password) => {
  const response = await fetch(baseUrl + 'login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
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
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('Failed to register user')
  }

  return await response.json()
}

export default { login, register }
