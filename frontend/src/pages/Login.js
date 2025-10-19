import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.js'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const signed = await login(email, password)
    setLoading(false)
    navigate(signed.role === 'admin' ? '/admin' : '/')
  }

  const h = React.createElement
  return h(
    'div',
    { className: 'min-h-dvh grid place-items-center bg-[var(--color-background)] text-[var(--color-foreground)] px-6' },
    h(
      'div',
      { className: 'w-full max-w-sm rounded-2xl bg-[var(--color-card)] p-6 ring-1 ring-[var(--color-border)]' },
      [
        h('div', { className: 'mb-6 text-center' }, [
          h('h1', { className: 'text-2xl font-semibold' }, 'QUIZZZ APP - KELOMPOK 9'),
          h('p', { className: 'mt-1 text-sm text-[var(--color-muted)]' }, 'Masuk ke akun Anda'),
        ]),
        h(
          'form',
          { onSubmit: handleSubmit, className: 'grid gap-4' },
          [
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
            h('button', {
              type: 'submit', disabled: loading,
              className: 'mt-2 h-11 rounded-xl bg-[var(--color-primary)] px-4 font-medium text-[var(--color-primary-foreground)] disabled:opacity-50'
            }, loading ? 'Masuk…' : 'Masuk'),
          ]
        ),
        h('div', { className: 'mt-6 text-sm' }, [
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


