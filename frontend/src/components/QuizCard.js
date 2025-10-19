import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Play } from 'lucide-react'

const h = React.createElement

export default function QuizCard({ quiz, ctaTo, ctaLabel = 'Mulai Kuis', hideCta = false }) {
  if (!quiz) return null
  const total = Array.isArray(quiz.questions) ? quiz.questions.length : 0
  return h(
    'div',
    { className: 'rounded-3xl bg-[var(--color-card)] p-6 ring-1 ring-[var(--color-border)]' },
    [
      h(
        'div',
        { className: 'mb-4 h-12 w-12 rounded-xl bg-[var(--color-primary)]/20 flex items-center justify-center' },
        h(FileText, { size: 20 })
      ),
      h('div', { className: 'mb-1 text-lg font-medium' }, quiz.title),
      h('p', { className: 'mb-6 max-w-xl text-sm text-[var(--color-muted)]' }, quiz.description || ''),
      h('div', { className: 'mb-6 grid grid-cols-2 text-sm text-[var(--color-muted)]' }, [
        h('div', null, 'Total Soal'),
        h('div', { className: 'text-right' }, `${total} soal`),
        h('div', null, 'Dibuat'),
        h('div', { className: 'text-right' }, quiz.createdAt || '-')
      ]),
      !hideCta && ctaTo
        ? h(
            Link,
            { to: ctaTo, className: 'mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-[var(--color-primary-foreground)] no-underline' },
            [h(Play, { size: 16 }), ctaLabel]
          )
        : null,
    ]
  )
}


