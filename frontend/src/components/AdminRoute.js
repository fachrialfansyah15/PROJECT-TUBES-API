import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.js'

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth()
  
  if (!isAuthenticated) {
    return React.createElement(Navigate, { to: '/login', replace: true })
  }
  
  if (user?.role !== 'admin') {
    return React.createElement(Navigate, { to: '/', replace: true })
  }
  
  return children
}


