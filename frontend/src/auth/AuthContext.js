import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api.js'

const AuthContext = createContext(null)

function getStoredUser() {
  try {
    const stored = localStorage.getItem('quiz_user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function storeUser(user) {
  try {
    if (user) {
      localStorage.setItem('quiz_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('quiz_user')
    }
  } catch {
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  useEffect(() => {
    storeUser(user)
  }, [user])

  async function login(email, password) {
    const normalized = email.trim().toLowerCase()
    console.log('AuthContext - Login attempt:', { email: normalized })

    // Use dummy authentication for demo purposes
    const role = normalized === 'admin@quiz.com' ? 'admin' : 'user'
    const newUser = {
      email: normalized,
      role,
      token: 'dummy-token',
    }
    
    setUser(newUser)
    console.log('AuthContext - User logged in:', newUser)
    return newUser
  }

  async function register(name, email, password) {
    try {
      console.log('AuthContext - Register attempt:', { name, email })
      
      const response = await api.register(name, email, password)
      console.log('AuthContext - Register response:', response)
      
      const userData = response.user || response
      const role = userData.email === 'admin@quiz.com' ? 'admin' : 'user'
      
      const newUser = { 
        email: userData.email, 
        name: userData.name,
        role,
        token: response.token || response.access_token,
      }
      
      setUser(newUser)
      console.log('AuthContext - User registered and logged in:', newUser)
      return newUser
    } catch (error) {
      console.error('AuthContext - Register error:', error)
      throw new Error(error.message || 'Registration failed')
    }
  }

  function logout() {
    console.log('AuthContext - User logged out')
    localStorage.removeItem('quiz_user')
    setUser(null)
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { isAuthenticated: !!user, user, login, register, logout } },
    children
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


