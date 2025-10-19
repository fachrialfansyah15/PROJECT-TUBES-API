import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuizStore } from '../store/quizStore.js'
import { Pencil, Trash2, FileText, CheckCircle } from 'lucide-react'

const h = React.createElement

export default function AdminManage() {
  const { quizzes, removeQuiz } = useQuizStore()
  const location = useLocation()
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (location.state?.message) {
      setNotification(location.state.message)
      setTimeout(() => setNotification(''), 3000)
      // Clear the state
      window.history.replaceState({}, document.title)
    }
  }, [location])

  return h('div', null, [
    notification ? h('div', { className: 'mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800' }, [
      h(CheckCircle, { size: 20 }),
      notification
    ]) : null,
    h('h1', { className: 'text-2xl font-semibold' }, 'Kelola Kuis'),
    h('p', { className: 'text-[var(--color-muted)]' }, 'Daftar kuis dan aksi.'),
    h(
      'div',
      { className: 'mt-6 grid gap-4' },
      quizzes.map((q) =>
        h(
          'div',
          { key: q.id, className: 'rounded-3xl bg-[var(--color-card)] p-6 ring-1 ring-[var(--color-border)]' },
          [
            h(
              'div',
              { className: 'mb-4 flex items-center justify-between' },
              [
                h(
                  'div',
                  { className: 'flex items-center gap-3' },
                  [
                    h('div', { className: 'h-12 w-12 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center' }, h(FileText, { size: 20 })),
                    h('div', { className: 'text-lg font-medium' }, q.title),
                  ]
                ),
                h('div', { className: 'flex gap-2' }, [
                  h(
                    Link,
                    { to: `/admin/edit/${q.id}`, className: 'inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm no-underline hover:bg-white/70 transition' },
                    [h(Pencil, { size: 16 }), 'Edit']
                  ),
                  h(
                    'button',
                    { onClick: () => removeQuiz(q.id), className: 'inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-red-600 hover:bg-white/70 transition' },
                    [h(Trash2, { size: 16 }), 'Hapus']
                  ),
                ]),
              ]
            ),
            h('p', { className: 'mb-6 max-w-xl text-sm text-[var(--color-muted)]' }, q.description || ''),
            h('div', { className: 'grid grid-cols-2 text-sm text-[var(--color-muted)]' }, [
              h('div', null, 'Total Soal'),
              h('div', { className: 'text-right' }, `${Array.isArray(q.questions) ? q.questions.length : 0} soal`),
              h('div', null, 'Dibuat'),
              h('div', { className: 'text-right' }, q.createdAt || '-'),
            ]),
          ]
        )
      )
    ),
  ])
}


