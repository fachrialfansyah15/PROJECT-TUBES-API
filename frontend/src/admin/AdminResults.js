import React from 'react'
import { useQuizStore } from '../store/quizStore.js'

const h = React.createElement

export default function AdminResults() {
  const { results } = useQuizStore()
  const totalPeserta = results.length
  const rataSkor = totalPeserta ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / totalPeserta) : 0
  const totalQuiz = new Set(results.map((r) => r.quizId)).size

  return h(
    'div',
    { className: 'space-y-6' },
    [
      h('h1', { className: 'text-2xl font-semibold' }, 'Hasil User'),
      h('p', { className: 'text-[var(--color-muted)]' }, 'Lihat hasil kuis yang telah dikerjakan user'),
      h('div', { key: 'summary-cards', className: 'grid gap-4 md:grid-cols-3' }, [
        h('div', { key: 'total-participants', className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
          h('div', { key: 'participants-label', className: 'text-sm text-[var(--color-muted)]' }, 'Total Peserta'),
          h('div', { key: 'participants-value', className: 'mt-2 text-2xl font-semibold' }, String(totalPeserta)),
        ]),
        h('div', { key: 'average-score', className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
          h('div', { key: 'score-label', className: 'text-sm text-[var(--color-muted)]' }, 'Rata-rata Skor'),
          h('div', { key: 'score-value', className: 'mt-2 text-2xl font-semibold' }, `${rataSkor}%`),
        ]),
        h('div', { key: 'total-quiz', className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
          h('div', { key: 'quiz-label', className: 'text-sm text-[var(--color-muted)]' }, 'Total Kuis'),
          h('div', { key: 'quiz-value', className: 'mt-2 text-2xl font-semibold' }, String(totalQuiz)),
        ]),
      ]),
      h('div', { className: 'overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]' },
        h('table', { className: 'w-full border-collapse text-left text-sm' }, [
          h('thead', { key: 'table-header', className: 'bg-white' },
            h('tr', { key: 'header-row', className: 'text-[var(--color-muted)]' }, [
              h('th', { key: 'user-name-header', className: 'px-4 py-3' }, 'Nama User'),
              h('th', { key: 'quiz-header', className: 'px-4 py-3' }, 'Kuis'),
              h('th', { key: 'score-header', className: 'px-4 py-3' }, 'Skor'),
              h('th', { key: 'percentage-header', className: 'px-4 py-3' }, 'Persentase'),
              h('th', { key: 'time-header', className: 'px-4 py-3' }, 'Waktu'),
            ])
          ),
          h('tbody', { key: 'table-body' },
            results.map((r) => h('tr', { key: r.id, className: 'border-t border-[var(--color-border)]' }, [
              h('td', { key: 'user-name-cell', className: 'px-4 py-3' }, r.userName),
              h('td', { key: 'quiz-cell', className: 'px-4 py-3' }, r.quizTitle),
              h('td', { key: 'score-cell', className: 'px-4 py-3' }, `${r.correct}/${r.total}`),
              h('td', { key: 'percentage-cell', className: 'px-4 py-3' }, h('span', { key: 'percentage-badge', className: 'rounded-full bg-green-100 px-2 py-0.5 text-green-700' }, `${r.percentage}%`)),
              h('td', { key: 'time-cell', className: 'px-4 py-3' }, r.time),
            ]))
          ),
        ])
      ),
    ]
  )
}


