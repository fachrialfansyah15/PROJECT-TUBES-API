import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useQuizById, useQuizStore, evaluateScore } from '../store/quizStore.js'
import { translateQuizOptimized } from '../services/translateService.js'

export default function Quiz() {
  const navigate = useNavigate()
  const { id } = useParams()
  const originalQuiz = useQuizById(id)
  const { addResult } = useQuizStore()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [quiz, setQuiz] = useState(originalQuiz)
  const [isTranslating, setIsTranslating] = useState(false)
  const total = quiz?.questions.length ?? 0

  // Auto-translate quiz on mount
  useEffect(() => {
    async function translateQuizContent() {
      if (!originalQuiz) return
      
      setIsTranslating(true)
      try {
        const translated = await translateQuizOptimized(originalQuiz)
        setQuiz(translated)
      } catch (error) {
        console.error('Translation failed:', error)
        setQuiz(originalQuiz) // Fallback to original
      } finally {
        setIsTranslating(false)
      }
    }
    
    translateQuizContent()
  }, [originalQuiz])

  const progress = total > 0 ? ((current + 1) / total) * 100 : 0

  const h = React.createElement
  
  // Show loading state while translating
  if (isTranslating) {
    return h(
      'div',
      { className: 'min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)] flex items-center justify-center' },
      h('div', { className: 'text-center' }, [
        h('div', { className: 'animate-pulse mb-4 text-[var(--color-muted)]' }, '🌐 Menerjemahkan kuis...'),
        h('div', { className: 'text-sm text-[var(--color-muted)]' }, 'Mohon tunggu sebentar')
      ])
    )
  }
  
  return h(
    'div',
    { className: 'min-h-dvh bg-[var(--color-background)] text-[var(--color-foreground)]' },
    [
      h(
        'header',
        { className: 'flex items-center gap-3 px-6 py-5' },
        [
          h(
            'button',
            {
              onClick: () => navigate(-1),
              className: 'inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-card)] hover:bg-white ring-1 ring-[var(--color-border)]',
            },
            h(ChevronLeft)
          ),
          h('h1', { className: 'text-lg font-medium capitalize' }, quiz?.title ?? 'Kuis'),
        ]
      ),
      h(
        'main',
        { className: 'px-6 pb-10' },
        [
          h(
            'div',
            { className: 'mb-6 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]' },
            h('div', {
              className: 'h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-300',
              style: { width: `${progress}%` },
            })
          ),
          h(
            'section',
            { className: 'mb-4 rounded-2xl bg-[var(--color-card)] p-5 ring-1 ring-[var(--color-border)]' },
            h('p', { className: 'text-base leading-relaxed' }, quiz?.questions[current]?.prompt)
          ),
          h(
            'div',
            { className: 'grid gap-3' },
            (quiz?.questions[current]?.options || []).map((opt) => {
              const isSelected = selected === opt.id
              return h(
                'button',
                {
                  key: opt.id,
                  onClick: () => setSelected(opt.id),
                  className:
                    'text-left rounded-2xl px-4 py-4 ring-1 transition ' +
                    (isSelected
                      ? 'bg-[var(--color-primary)] text-white ring-transparent'
                      : 'bg-[var(--color-card)] text-[var(--color-foreground)] ring-[var(--color-border)] hover:bg-white'),
                },
                opt.text
              )
            })
          ),
          h(
            'div',
            { className: 'mt-6 flex items-center justify-between' },
            [
              h('div', { className: 'text-sm text-[var(--color-muted)]' }, `Pertanyaan ${current + 1} dari ${total}`),
              h(
                'button',
                {
                  onClick: () => {
                    if (current + 1 < total) {
                      setAnswers((arr) => {
                        const next = [...arr]
                        next[current] = selected
                        return next
                      })
                      setCurrent((c) => c + 1)
                      setSelected(null)
                    } else {
                      const result = evaluateScore(quiz?.questions ?? [], [...answers, selected])
                      addResult({
                        userName: 'Demo User',
                        quizId: quiz?.id ?? 'unknown',
                        quizTitle: quiz?.title ?? 'Kuis',
                        correct: result.correct,
                        total: result.total,
                        percentage: result.percentage,
                        time: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                      })
                      navigate('/results')
                    }
                  },
                  disabled: !selected,
                  className: 'rounded-xl bg-[var(--color-primary)] px-5 py-3 font-medium text-[var(--color-primary-foreground)] disabled:opacity-50',
                },
                current + 1 < total ? 'Selanjutnya' : 'Selesai'
              ),
            ]
          ),
        ]
      ),
    ]
  )
}


