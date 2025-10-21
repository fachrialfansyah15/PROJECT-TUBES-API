import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.js'

export default function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const signed = await login(email, password)
      navigate(signed.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(err.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama')
      setLoading(false)
      return
    }
    
    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      setLoading(false)
      return
    }
    
    try {
      const signed = await register(name, email, password)
      navigate(signed.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(err.message || 'Registrasi gagal')
    } finally {
      setLoading(false)
    }
  }

  const h = React.createElement
  return h(
    'div',
    { className: 'min-h-dvh grid place-items-center bg-[var(--color-background)] text-[var(--color-foreground)] px-6' },
    h(
      'div',
      { className: 'w-full max-w-md rounded-2xl bg-[var(--color-card)] p-6 ring-1 ring-[var(--color-border)]' },
      [
        h('div', { className: 'mb-6 text-center' }, [
          h('h1', { className: 'text-2xl font-semibold' }, 'QUIZZZ APP - KELOMPOK 9'),
          h('p', { className: 'mt-1 text-sm text-[var(--color-muted)]' }, 
            isLogin ? 'Masuk ke akun Anda' : 'Buat akun baru'
          ),
        ]),
        
        h('div', { key: 'toggle-buttons', className: 'mb-6 flex rounded-lg bg-gray-100 p-1' }, [
          h('button', {
            key: 'login-tab',
            type: 'button',
            onClick: () => {
              setIsLogin(true)
              setError('')
              setName('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            },
            className: `flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isLogin 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`
          }, 'Masuk'),
          h('button', {
            key: 'register-tab',
            type: 'button',
            onClick: () => {
              setIsLogin(false)
              setError('')
              setName('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
            },
            className: `flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              !isLogin 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`
          }, 'Daftar'),
        ]),

        error && h('div', { 
          className: 'mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600' 
        }, error),
        h(
          'form',
          { onSubmit: isLogin ? handleLogin : handleRegister, className: 'grid gap-4' },
          [
            !isLogin && h('div', { className: 'grid gap-2' }, [
              h('label', { htmlFor: 'name', className: 'text-sm' }, 'Nama Lengkap'),
              h('input', {
                id: 'name', type: 'text', required: !isLogin, value: name,
                onChange: (e) => setName(e.target.value),
                className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3 outline-none focus:border-[var(--color-primary)]',
                placeholder: 'Masukkan nama lengkap',
              }),
            ]),
            
            h('div', { className: 'grid gap-2' }, [
              h('label', { htmlFor: 'email', className: 'text-sm' }, 'Email'),
              h('input', {
                id: 'email', type: 'email', required: true, value: email,
                onChange: (e) => setEmail(e.target.value),
                className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3 outline-none focus:border-[var(--color-primary)]',
                placeholder: 'you@example.com',
              }),
            ]),
            
            h('div', { className: 'grid gap-2' }, [
              h('label', { htmlFor: 'password', className: 'text-sm' }, 'Password'),
              h('input', {
                id: 'password', type: 'password', required: true, value: password,
                onChange: (e) => setPassword(e.target.value),
                className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3 outline-none focus:border-[var(--color-primary)]',
                placeholder: '••••••••',
              }),
            ]),
            
            !isLogin && h('div', { className: 'grid gap-2' }, [
              h('label', { htmlFor: 'confirmPassword', className: 'text-sm' }, 'Konfirmasi Password'),
              h('input', {
                id: 'confirmPassword', type: 'password', required: !isLogin, value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3 outline-none focus:border-[var(--color-primary)]',
                placeholder: '••••••••',
              }),
            ]),
            
            h('button', {
              type: 'submit', disabled: loading,
              className: 'mt-2 h-11 rounded-xl bg-[var(--color-primary)] px-4 font-medium text-[var(--color-primary-foreground)] disabled:opacity-50'
            }, loading ? (isLogin ? 'Masuk…' : 'Daftar…') : (isLogin ? 'Masuk' : 'Daftar')),
          ]
        ),
        
        isLogin && h('div', { className: 'mt-6 text-sm' }, [
          h('div', { className: 'font-medium' }, 'Akun Demo:'),
          h('div', { className: 'mt-2 grid gap-1' }, [
            h('div', null, ['👨‍💼 Admin: ', h('code', null, 'admin@quiz.com')]),
            h('div', null, ['👤 User: ', h('code', null, 'user@quiz.com')]),
          ]),
          h('div', { className: 'mt-2 text-[var(--color-muted)]' }, 'Password bebas (gunakan password apapun)'),
        ]),
      ]
    )
  )
}


