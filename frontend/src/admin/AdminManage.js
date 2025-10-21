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
      window.history.replaceState({}, document.title)
    }
  }, [location])

  return h('div', { key: 'admin-manage-container' }, [
    notification ? h('div', { key: 'notification', className: 'mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800' }, [
      h(CheckCircle, { key: 'check-icon', size: 20 }),
      notification
    ]) : null,
    h('h1', { key: 'title', className: 'text-2xl font-semibold' }, 'Kelola Kuis'),
    h('p', { key: 'subtitle', className: 'text-[var(--color-muted)]' }, 'Daftar kuis dan aksi.'),
    h(
      'div',
      { key: 'quizzes-grid', className: 'mt-6 grid gap-4' },
      quizzes.map((q) =>
        h(
          'div',
          { key: q.id, className: 'rounded-3xl bg-[var(--color-card)] p-6 ring-1 ring-[var(--color-border)]' },
          [
            h(
              'div',
              { key: 'quiz-header', className: 'mb-4 flex items-center justify-between' },
              [
                h(
                  'div',
                  { key: 'quiz-info', className: 'flex items-center gap-3' },
                  [
                    h('div', { key: 'quiz-icon', className: 'h-12 w-12 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center' }, h(FileText, { key: 'file-icon', size: 20 })),
                    h('div', { key: 'quiz-title', className: 'text-lg font-medium' }, q.title),
                  ]
                ),
                h('div', { key: 'quiz-actions', className: 'flex gap-2' }, [
                  h(
                    Link,
                    { key: 'edit-link', to: `/admin/edit/${q.id}`, className: 'inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm no-underline hover:bg-white/70 transition' },
                    [h(Pencil, { key: 'edit-icon', size: 16 }), 'Edit']
                  ),
                  h(
                    'button',
                    { key: 'delete-btn', onClick: () => removeQuiz(q.id), className: 'inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-red-600 hover:bg-white/70 transition' },
                    [h(Trash2, { key: 'delete-icon', size: 16 }), 'Hapus']
                  ),
                ]),
              ]
            ),
            h('p', { key: 'quiz-description', className: 'mb-6 max-w-xl text-sm text-[var(--color-muted)]' }, q.description || ''),
            h('div', { key: 'quiz-stats', className: 'grid grid-cols-2 text-sm text-[var(--color-muted)]' }, [
              h('div', { key: 'total-label', className: null }, 'Total Soal'),
              h('div', { key: 'total-value', className: 'text-right' }, `${Array.isArray(q.questions) ? q.questions.length : 0} soal`),
              h('div', { key: 'created-label', className: null }, 'Dibuat'),
              h('div', { key: 'created-value', className: 'text-right' }, q.createdAt || '-'),
            ]),
          ]
        )
      )
    ),
  ])
}


