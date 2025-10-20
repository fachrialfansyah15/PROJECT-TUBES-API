// API Service untuk koneksi ke backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api'

class ApiService {
  constructor() {
    this.baseURL = API_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
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

  // Quiz endpoints
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
}

export const api = new ApiService()
export default api

