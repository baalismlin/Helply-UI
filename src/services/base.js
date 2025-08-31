const API_BASE = 'http://localhost:8080/api'

export default class BaseService {
  removeToken() {
    localStorage.removeItem('token')
  }

  setToken(token) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  async get(endpoint, parameters = {}) {
    try {
      const url = new URL(`${API_BASE}/${endpoint}`)
      Object.keys(parameters).forEach((key) =>
        url.searchParams.append(key, parameters[key])
      )

      const response = await fetch(url, {
        method: 'GET',
        headers: this.buildHeaders(),
      })

      if (!response.ok) {
        throw new Error(response)
      }

      return await response.json()
    } catch (error) {
      console.error(`GET ${endpoint} error:`, error)
      throw error
    }
  }

  async post(endpoint, body = {}) {
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: this.buildHeaders(),
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(response)
      }

      return await response.json()
    } catch (error) {
      console.error(`POST ${endpoint} error:`, error)
      throw error
    }
  }

  async put(endpoint, body = {}) {
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'PUT',
        headers: this.buildHeaders(),
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(response)
      }

      return await response.json()
    } catch (error) {
      console.error(`PUT ${endpoint} error:`, error)
      throw error
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'DELETE',
        headers: this.buildHeaders(),
      })
      if (!response.ok) {
        throw new Error(response)
      }
    } catch (error) {
      console.error(`DELETE ${endpoint} error:`, error)
      throw error
    }
  }

  buildHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }
    const token = this.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }
}
