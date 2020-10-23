window.api = {
  async get(query) {
    return request('POST', '/query?timeout=10s', { query: String(query) })
  },

  async post(body) {
    return request('POST', '/mutate?commitNow=true', { set: Array.isArray(body) ? body : [body] })
  }
}

function serializeForm(form) {
  return Array.from(form.elements).filter(e => e.name).reduce((acc, e) => {
    acc[e.name] = e.value
    return acc
  }, {})
}

async function request(method, uri, body, options = {}) {
  options.body = body ? JSON.stringify(body) : ""
  options.method = method
  if(!options.headers) options.headers = {}
  options.headers['Content-Type'] = 'application/json'
  // options.headers = { 'API-KEY': localStorage.token }
  const response = await fetch(`http://localhost:8080${uri}`, options)
  let content = {}
  try {
    content = await response.json()
  }
  catch {
    content = {}
  }

  if(response.errors) response.ok = false
  else response.data = content.data
  if(!response.ok && response.data) alert(response.errors[0].message)
  return response
}

function getAge(d1, d2 = new Date()) {
  if(!d1.getYear) d1 = new Date(d1)
  const diff = d2.getTime() - d1.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}
