const baseUrl = 'http://localhost:3003/api/assets'

const search = async () => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to search')
  }

  return await response.json()
}

export default { search }
