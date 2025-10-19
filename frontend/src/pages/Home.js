import React from 'react'
import { Link } from 'react-router-dom'
import QuizCard from '../components/QuizCard.js'
import { useQuizStore } from '../store/quizStore.js'

const h = React.createElement

export default function Home() {
  const { quizzes } = useQuizStore()

  return h(
    'div',
    { className: 'min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)]' },
    [
      h('header', { className: 'px-6 py-10 text-center' }, [
        h('h1', { className: 'text-3xl font-semibold' }, 'Kuis Tersedia'),
        h('p', { className: 'mt-2 text-[var(--color-muted)]' }, 'Pilih kuis yang ingin kamu kerjakan'),
      ]),
      h(
        'main',
        { className: 'px-6 pb-16' },
        h(
          'div',
          { className: 'grid gap-6 md:grid-cols-2' },
          quizzes.map((q) => h(QuizCard, { key: q.id, quiz: q, ctaTo: `/quiz/${q.id}`, ctaLabel: 'Mulai Kuis' }))
        )
      ),
    ]
  )
}


