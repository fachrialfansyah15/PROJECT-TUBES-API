import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../auth/AuthContext.js'

const h = React.createElement

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  
  const correct = location.state?.correct ?? 0
  const total = location.state?.total ?? 0
  const percentage = location.state?.percentage ?? 0
  const quizTitle = location.state?.quizTitle ?? 'Kuis'
  const quizId = location.state?.quizId ?? 'general'

  return h(
    'div',
    { className: 'min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)]' },
    [
      h('div', { className: 'flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]' }, [
        h('div', { className: 'text-sm font-semibold text-[var(--color-muted)]' }, 'QUIZZZ APP'),
        h(
          'button',
          {
            onClick: () => {
              logout()
              navigate('/login', { replace: true })
            },
            className: 'flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm hover:bg-gray-50 transition',
          },
          [h(LogOut, { size: 16 }), 'Logout']
        ),
      ]),
      h(
        'main',
        { className: 'px-6 pt-16 pb-10' },
      h(
        'section',
        { className: 'mx-auto max-w-md rounded-3xl bg-[var(--color-card)] p-8 text-center ring-1 ring-[var(--color-border)]' },
        [
          h('div', { className: 'mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-[var(--color-primary)]/30 to-black/5' }),
          h('h1', { className: 'mb-2 text-2xl font-semibold' }, 'Hasil Anda'),
          h('p', { className: 'mb-6 text-[var(--color-muted)]' }, `Anda menjawab benar ${correct} dari ${total} soal`),
          h('div', { className: 'mx-auto mb-6 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]' },
            h('div', { className: 'h-full rounded-full bg-[var(--color-primary)]', style: { width: `${percentage}%` } })
          ),
          h('div', { className: 'mb-6 text-sm text-[var(--color-muted)]' }, `${percentage}% benar`),
          h('div', { className: 'flex justify-center gap-3' }, [
            h(Link, { to: '/', className: 'rounded-xl bg-white px-4 py-3 text-[var(--color-foreground)] no-underline ring-1 ring-[var(--color-border)]' }, 'Kembali'),
            h(Link, { to: `/quiz/${quizId}`, className: 'rounded-xl bg-[var(--color-primary)] px-4 py-3 text-[var(--color-primary-foreground)] no-underline' }, 'Ulangi Kuis'),
          ]),
        ]
      )
      ),
    ]
  )
}


