const baseUrl = 'http://localhost:3003/api/assets'

const search = async (nameSearchTerm, popular) => {
  const searchTerms = []
  if (nameSearchTerm) {
    searchTerms.push('name=' + nameSearchTerm)
  }
  if (popular) {
    searchTerms.push('popular=1')
  }
  let searchUrl = baseUrl
  if (searchTerms.length > 0) {
    searchUrl += '?' + searchTerms.join('&')
  }

  console.log('Searching:', searchUrl)
  const response = await fetch(searchUrl, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to search')
  }

  return await response.json()
}

const get = async (id) => {
  const response = await fetch(baseUrl + '/' + id, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to find asset')
  }

  return await response.json()
}

const getComments = async (id) => {
  const response = await fetch(baseUrl + '/' + id + '/comments', {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to get comments')
  }

  return await response.json()
}

const comment = async (id, content, timestamp, token) => {
  const response = await fetch(baseUrl + '/' + id + '/comments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, timestamp })
  })

  if (!response.ok) {
    throw new Error('Failed to post comment')
  }

  return await response.json()
}

export default { search, get, getComments, comment }
