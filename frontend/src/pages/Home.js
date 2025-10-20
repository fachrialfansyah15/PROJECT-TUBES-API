import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import QuizCard from '../components/QuizCard.js'
import { useQuizStore } from '../store/quizStore.js'
import { useAuth } from '../auth/AuthContext.js'

const h = React.createElement

export default function Home() {
  const { quizzes } = useQuizStore()
  const { logout } = useAuth()
  const navigate = useNavigate()

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
      h('header', { className: 'px-6 py-10 text-center' }, [
        h('h1', { className: 'text-3xl font-semibold' }, 'Kuis Tersedia'),
        h('p', { className: 'mt-2 text-[var(--color-muted)]' }, 'Pilih kuis yang ingin kamu kerjakan'),
      ]),
      h(
        'main',
        { className: 'px-6 pb-16' },
        h(
          'div',
          { className: 'grid gap-6 md:grid-cols-2' },
          quizzes.map((q) => h(QuizCard, { key: q.id, quiz: q, ctaTo: `/quiz/${q.id}`, ctaLabel: 'Mulai Kuis' }))
        )
      ),
    ]
  )
}


