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
      h('div', { className: 'grid gap-4 md:grid-cols-3' }, [
        h('div', { className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
          h('div', { className: 'text-sm text-[var(--color-muted)]' }, 'Total Peserta'),
          h('div', { className: 'mt-2 text-2xl font-semibold' }, String(totalPeserta)),
        ]),
        h('div', { className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
          h('div', { className: 'text-sm text-[var(--color-muted)]' }, 'Rata-rata Skor'),
          h('div', { className: 'mt-2 text-2xl font-semibold' }, `${rataSkor}%`),
        ]),
        h('div', { className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
          h('div', { className: 'text-sm text-[var(--color-muted)]' }, 'Total Kuis'),
          h('div', { className: 'mt-2 text-2xl font-semibold' }, String(totalQuiz)),
        ]),
      ]),
      h('div', { className: 'overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]' },
        h('table', { className: 'w-full border-collapse text-left text-sm' }, [
          h('thead', { className: 'bg-white' },
            h('tr', { className: 'text-[var(--color-muted)]' }, [
              h('th', { className: 'px-4 py-3' }, 'Nama User'),
              h('th', { className: 'px-4 py-3' }, 'Kuis'),
              h('th', { className: 'px-4 py-3' }, 'Skor'),
              h('th', { className: 'px-4 py-3' }, 'Persentase'),
              h('th', { className: 'px-4 py-3' }, 'Waktu'),
            ])
          ),
          h('tbody', null,
            results.map((r) => h('tr', { key: r.id, className: 'border-t border-[var(--color-border)]' }, [
              h('td', { className: 'px-4 py-3' }, r.userName),
              h('td', { className: 'px-4 py-3' }, r.quizTitle),
              h('td', { className: 'px-4 py-3' }, `${r.correct}/${r.total}`),
              h('td', { className: 'px-4 py-3' }, h('span', { className: 'rounded-full bg-green-100 px-2 py-0.5 text-green-700' }, `${r.percentage}%`)),
              h('td', { className: 'px-4 py-3' }, r.time),
            ]))
          ),
        ])
      ),
    ]
  )
}


