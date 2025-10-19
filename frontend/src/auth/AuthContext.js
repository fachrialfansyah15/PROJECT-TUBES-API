import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(email, password) {
    const normalized = email.trim().toLowerCase()
    const role = normalized === 'admin@quiz.com' ? 'admin' : 'user'
    if (normalized && password !== undefined) {
      const newUser = { email: normalized, role }
      setUser(newUser)
      return newUser
    }
    throw new Error('Invalid credentials')
  }

  function logout() {
    setUser(null)
  }

  return React.createElement(
    AuthContext.Provider,
    { value: { isAuthenticated: !!user, user, login, logout } },
    children
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


