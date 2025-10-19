import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, RefreshCw, Languages } from 'lucide-react'
import QuizCard from '../components/QuizCard.js'
import { useQuizStore } from '../store/quizStore.js'

export default function AdminDashboard() {
  const h = React.createElement
  const { quizzes, resetToDefaults, migrateQuizzesToIndonesian } = useQuizStore()
  const [migrationMessage, setMigrationMessage] = useState('')

  function handleMigrate() {
    const result = migrateQuizzesToIndonesian()
    setMigrationMessage(result.message)
    setTimeout(() => setMigrationMessage(''), 3000)
  }
  
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
              onClick: handleMigrate, 
              className: 'flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-xs text-blue-700 hover:bg-blue-100 transition',
              title: 'Translate semua kuis ke Bahasa Indonesia'
            }, [
              h(Languages, { size: 14 }), 'Migrate ke ID'
            ]),
            h('button', { 
              onClick: () => { 
                if (confirm('Reset semua data quiz dan hasil ke default?')) resetToDefaults() 
              }, 
              className: 'flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs text-[var(--color-muted)] hover:bg-white/70 transition' 
            }, [
              h(RefreshCw, { size: 14 }), 'Reset Data'
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
      h('div', { className: 'grid gap-4 md:grid-cols-2' }, 
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


