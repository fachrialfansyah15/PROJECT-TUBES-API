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
      migrationMessage ? h('div', { className: 'rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 text-sm' }, migrationMessage) : null,
      h('div', null, [
        h('h1', { className: 'text-2xl font-semibold' }, 'Dashboard Admin'),
        h('p', { className: 'text-[var(--color-muted)]' }, 'Kelola quiz Anda'),
      ]),
      h('section', { className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
        h('div', { className: 'mb-4 flex items-center justify-between' }, [
          h('div', { className: 'text-sm font-medium' }, '✨ Fitur Admin'),
          h('div', { className: 'flex gap-2' }, [
            h('button', { 
              onClick: () => { 
                refetch() 
                setMigrationMessage('Data kuis berhasil dimuat ulang')
                setTimeout(() => setMigrationMessage(''), 3000)
              }, 
              className: 'flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs text-blue-700 hover:bg-blue-100 transition',
              title: 'Muat ulang data kuis dari server'
            }, [
              h(RefreshCw, { size: 14 }), 'Refresh Data'
            ]),
          ]),
        ]),
        h('div', { className: 'grid grid-cols-1 gap-3 md:grid-cols-3' }, [
          h(Link, { to: '/admin/create', className: 'flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 no-underline text-[var(--color-foreground)]' }, [
            h(Plus, { size: 18 }), 'Buat Kuis Baru'
          ]),
          h(Link, { to: '/admin/manage', className: 'flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 no-underline text-[var(--color-foreground)]' }, [
            h(Pencil, { size: 18 }), 'Edit Kuis'
          ]),
          h(Link, { to: '/admin/manage', className: 'flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 no-underline text-red-600' }, [
            h(Trash2, { size: 18 }), 'Hapus Kuis'
          ]),
        ]),
      ]),
      loading
        ? h('div', { className: 'text-center py-12' }, [
            h('div', { className: 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent' }),
            h('p', { className: 'mt-4 text-[var(--color-muted)]' }, 'Memuat kuis...')
          ])
        : error
        ? h('div', { className: 'max-w-md mx-auto text-center py-12' }, [
            h('div', { className: 'rounded-lg bg-red-50 border border-red-200 p-6' }, [
              h('p', { className: 'text-red-600 font-medium' }, 'Gagal memuat kuis'),
              h('p', { className: 'text-red-500 text-sm mt-2' }, error)
            ])
          ])
        : quizzes.length === 0
        ? h('div', { className: 'text-center py-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]' }, [
            h('p', { className: 'text-[var(--color-muted)]' }, 'Belum ada kuis tersedia'),
            h('p', { className: 'text-sm text-[var(--color-muted)] mt-2' }, 'Klik "Buat Kuis Baru" untuk memulai')
          ])
        : h('div', { className: 'grid gap-4 md:grid-cols-2' }, 
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


