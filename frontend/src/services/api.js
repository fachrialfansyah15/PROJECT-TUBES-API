const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api'

class ApiService {
  constructor() {
    this.baseURL = API_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    // Get token from localStorage
    const token = this.getToken()
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }))
        throw new Error(error.message || `HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  getToken() {
    try {
      const user = localStorage.getItem('quiz_user')
      if (user) {
        const userData = JSON.parse(user)
        return userData.token || null
      }
      return null
    } catch {
      return null
    }
  }

  async getQuizzes() {
    return this.request('/quizzes')
  }

  async getQuiz(id) {
    return this.request(`/quizzes/${id}`)
  }

  async createQuiz(data) {
    return this.request('/quizzes', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateQuiz(id, data) {
    return this.request(`/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteQuiz(id) {
    return this.request(`/quizzes/${id}`, {
      method: 'DELETE',
    })
  }

  async login(email, password) {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name, email, password) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }
}

export const api = new ApiService()
export default api

