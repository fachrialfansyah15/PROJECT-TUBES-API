import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import QuizCard from '../components/QuizCard.js'
import { useQuizStore } from '../store/quizStore.js'
import { useAuth } from '../auth/AuthContext.js'

const h = React.createElement

export default function Home() {
  const { quizzes, loading, error } = useQuizStore()
  const { logout } = useAuth()
  const navigate = useNavigate()

  return h(
    'div',
    { className: 'min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)]' },
    [
      h('div', { key: 'header', className: 'flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]' }, [
        h('div', { key: 'title', className: 'text-sm font-semibold text-[var(--color-muted)]' }, 'QUIZZZ APP'),
        h(
          'button',
          {
            key: 'logout',
            onClick: () => {
              logout()
              navigate('/login', { replace: true })
            },
            className: 'flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm hover:bg-gray-50 transition',
          },
          [h(LogOut, { key: 'icon', size: 16 }), 'Logout']
        ),
      ]),
      h('header', { key: 'page-header', className: 'px-6 py-10 text-center' }, [
        h('h1', { key: 'heading', className: 'text-3xl font-semibold' }, 'Kuis Tersedia'),
        h('p', { key: 'description', className: 'mt-2 text-[var(--color-muted)]' }, 'Pilih kuis yang ingin kamu kerjakan'),
      ]),
      h(
        'main',
        { className: 'px-6 pb-16' },
        loading
          ? h('div', { key: 'loading', className: 'text-center py-12' }, [
              h('div', { key: 'spinner', className: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent' }),
              h('p', { key: 'loading-text', className: 'mt-4 text-[var(--color-muted)]' }, 'Memuat kuis...')
            ])
          : error
          ? h('div', { key: 'error', className: 'max-w-md mx-auto text-center py-12' }, [
              h('div', { key: 'error-box', className: 'rounded-lg bg-red-50 border border-red-200 p-6' }, [
                h('p', { key: 'error-title', className: 'text-red-600 font-medium' }, 'Gagal memuat kuis'),
                h('p', { key: 'error-message', className: 'text-red-500 text-sm mt-2' }, error),
                h('p', { key: 'error-hint', className: 'text-sm text-[var(--color-muted)] mt-4' }, 'Pastikan backend sudah berjalan di http://localhost:3333')
              ])
            ])
          : quizzes.length === 0
          ? h('div', { key: 'empty', className: 'text-center py-12' }, [
              h('p', { key: 'empty-message', className: 'text-[var(--color-muted)]' }, 'Belum ada kuis tersedia'),
              h('p', { key: 'empty-hint', className: 'text-sm text-[var(--color-muted)] mt-2' }, 'Silakan buat kuis baru dari dashboard admin')
            ])
          : h(
              'div',
              { key: 'quiz-grid', className: 'grid gap-6 md:grid-cols-2' },
              quizzes.map((q) => h(QuizCard, { key: q.id, quiz: q, ctaTo: `/quiz/${q.id}`, ctaLabel: 'Mulai Kuis' }))
            )
      ),
    ]
  )
}


