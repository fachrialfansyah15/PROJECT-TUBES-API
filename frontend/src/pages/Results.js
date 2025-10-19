import React from 'react'
import { Link } from 'react-router-dom'

const h = React.createElement

export default function Results() {
  const correct = 7
  const total = 10
  const percentage = Math.round((correct / total) * 100)

  return h(
    'div',
    { className: 'min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)]' },
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
            h(Link, { to: '/quiz/general', className: 'rounded-xl bg-[var(--color-primary)] px-4 py-3 text-[var(--color-primary-foreground)] no-underline' }, 'Ulangi Kuis'),
          ]),
        ]
      )
    )
  )
}


