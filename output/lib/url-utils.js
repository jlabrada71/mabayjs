export function replace (s, s1, s2) {
  return s.split(s1).join(s2)
}

export function safeUrl (s) {
  const tokens = [{ what: ' ', by: '-' },
    { what: '?', by: '-' },
    { what: '!', by: '-' },
    { what: '.', by: '-' },
    { what: '\'', by: '-' },
    { what: ':', by: '-' },
    { what: '--', by: '-' }]
  let result = s.toLowerCase()
  tokens.forEach((token) => {
    result = replace(result, token.what, token.by)
  })
  while (result.lastIndexOf('-') === result.length - 1) {
    result = result.substring(0, result.lastIndexOf('-'))
  }
  return result
}

export function toQuery (obj) {
  let queryString = ''
  if (obj) {
    let operator = '?'
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      queryString += `${operator}${key}=${obj[key]}`
      operator = '&'
    })
  }
  return queryString
}

export function accessToken () {
  if (process.browser) {
    const token = window.localStorage.getItem('accessToken')
    const authorization = `Bearer ${token}`
    return {
      headers: {
        Authorization: authorization
      }
    }
  }
}
