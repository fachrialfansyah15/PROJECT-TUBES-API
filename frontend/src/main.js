import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/AuthContext.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import AdminRoute from './components/AdminRoute.js'
import AdminLayout from './admin/AdminLayout.js'
import AdminDashboard from './admin/AdminDashboard.js'
import AdminCreateQuiz from './admin/AdminCreateQuiz.js'
import AdminEditQuiz from './admin/AdminEditQuiz.js'
import AdminResults from './admin/AdminResults.js'
import AdminManage from './admin/AdminManage.js'
import { QuizStoreProvider } from './store/quizStore.js'

const Home = React.lazy(() => import('./pages/Home.js'))
const Quiz = React.lazy(() => import('./pages/Quiz.js'))
const Results = React.lazy(() => import('./pages/Results.js'))
const Login = React.lazy(() => import('./pages/Login.js'))

const router = createBrowserRouter([
  { path: '/login', element: React.createElement(Login) },
  {
    path: '/admin',
    element: React.createElement(AdminRoute, null, React.createElement(AdminLayout)),
    children: [
      { index: true, element: React.createElement(AdminDashboard) },
      { path: 'create', element: React.createElement(AdminCreateQuiz) },
      { path: 'edit/:id', element: React.createElement(AdminEditQuiz) },
      { path: 'results', element: React.createElement(AdminResults) },
      { path: 'manage', element: React.createElement(AdminManage) },
    ],
  },
  {
    path: '/',
    element: React.createElement(ProtectedRoute, null, React.createElement(Home)),
  },
  {
    path: '/quiz/:id',
    element: React.createElement(ProtectedRoute, null, React.createElement(Quiz)),
  },
  {
    path: '/results',
    element: React.createElement(ProtectedRoute, null, React.createElement(Results)),
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      React.Suspense,
      { fallback: null },
      React.createElement(
        AuthProvider,
        null,
        React.createElement(
          QuizStoreProvider,
          null,
          React.createElement(RouterProvider, { router })
        )
      )
    )
  )
)


