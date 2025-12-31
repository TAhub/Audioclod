const baseUrl = 'http://localhost:3003/api/login'

const login = async (username, password) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('Failed to log in')
  }

  return await response.json()
}

export default { login }
