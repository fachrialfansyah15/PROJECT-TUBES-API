import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import AdminCreateQuiz from './admin/AdminCreateQuiz'
import AdminResults from './admin/AdminResults'
import { QuizStoreProvider } from './store/quizStore'

const Home = React.lazy(() => import('./pages/Home'))
const Quiz = React.lazy(() => import('./pages/Quiz'))
const Results = React.lazy(() => import('./pages/Results'))
const Login = React.lazy(() => import('./pages/Login'))

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'create', element: <AdminCreateQuiz /> },
      { path: 'results', element: <AdminResults /> },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/quiz/:id',
    element: (
      <ProtectedRoute>
        <Quiz />
      </ProtectedRoute>
    ),
  },
  {
    path: '/results',
    element: (
      <ProtectedRoute>
        <Results />
      </ProtectedRoute>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={null}>
      <AuthProvider>
        <QuizStoreProvider>
          <RouterProvider router={router} />
        </QuizStoreProvider>
      </AuthProvider>
    </React.Suspense>
  </React.StrictMode>
)


