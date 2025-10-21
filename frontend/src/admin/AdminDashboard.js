import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, RefreshCw, Languages } from 'lucide-react'
import QuizCard from '../components/QuizCard.js'
import { useQuizStore } from '../store/quizStore.js'

export default function AdminDashboard() {
  const h = React.createElement
  const { quizzes, loading, error, resetToDefaults, refetch } = useQuizStore()
  const [migrationMessage, setMigrationMessage] = useState('')
  
  return h(
    'div',
    { className: 'space-y-6' },
    [
      migrationMessage ? h('div', { key: 'migration-message', className: 'rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 text-sm' }, migrationMessage) : null,
      h('div', { key: 'header' }, [
        h('h1', { key: 'title', className: 'text-2xl font-semibold' }, 'Dashboard Admin'),
        h('p', { key: 'subtitle', className: 'text-[var(--color-muted)]' }, 'Kelola quiz Anda'),
      ]),
      h('section', { className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
        h('div', { key: 'section-header', className: 'mb-4 flex items-center justify-between' }, [
          h('div', { key: 'section-title', className: 'text-sm font-medium' }, '✨ Fitur Admin'),
          h('div', { key: 'section-actions', className: 'flex gap-2' }, [
            h('button', { 
              key: 'refresh-btn',
              onClick: () => { 
                refetch() 
                setMigrationMessage('Data kuis berhasil dimuat ulang')
                setTimeout(() => setMigrationMessage(''), 3000)
              }, 
              className: 'flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs text-blue-700 hover:bg-blue-100 transition',
              title: 'Muat ulang data kuis dari server'
            }, [
              h(RefreshCw, { key: 'refresh-icon', size: 14 }), 'Refresh Data'
            ]),
          ]),
        ]),
        h('div', { key: 'action-cards', className: 'grid grid-cols-1 gap-3 md:grid-cols-3' }, [
          h(Link, { key: 'create-card', to: '/admin/create', className: 'flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 no-underline text-[var(--color-foreground)]' }, [
            h(Plus, { key: 'create-icon', size: 18 }), 'Buat Kuis Baru'
          ]),
          h(Link, { key: 'edit-card', to: '/admin/manage', className: 'flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 no-underline text-[var(--color-foreground)]' }, [
            h(Pencil, { key: 'edit-icon', size: 18 }), 'Edit Kuis'
          ]),
          h(Link, { key: 'delete-card', to: '/admin/manage', className: 'flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 no-underline text-red-600' }, [
            h(Trash2, { key: 'delete-icon', size: 18 }), 'Hapus Kuis'
          ]),
        ]),
      ]),
      loading
        ? h('div', { key: 'loading-state', className: 'text-center py-12' }, [
            h('div', { key: 'loading-spinner', className: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent' }),
            h('p', { key: 'loading-text', className: 'mt-4 text-[var(--color-muted)]' }, 'Memuat kuis...')
          ])
        : error
        ? h('div', { key: 'error-state', className: 'max-w-md mx-auto text-center py-12' }, [
            h('div', { key: 'error-container', className: 'rounded-lg bg-red-50 border border-red-200 p-6' }, [
              h('p', { key: 'error-title', className: 'text-red-600 font-medium' }, 'Gagal memuat kuis'),
              h('p', { key: 'error-message', className: 'text-red-500 text-sm mt-2' }, error)
            ])
          ])
        : quizzes.length === 0
        ? h('div', { key: 'empty-state', className: 'text-center py-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]' }, [
            h('p', { key: 'empty-message', className: 'text-[var(--color-muted)]' }, 'Belum ada kuis tersedia'),
            h('p', { key: 'empty-hint', className: 'text-sm text-[var(--color-muted)] mt-2' }, 'Klik "Buat Kuis Baru" untuk memulai')
          ])
        : h('div', { key: 'quizzes-grid', className: 'grid gap-4 md:grid-cols-2' }, 
            quizzes.map((q) => 
              h(QuizCard, { 
                key: q.id, 
                quiz: q, 
                hideCta: true 
              })
            )
          ),
    ]
  )
}


