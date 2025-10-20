import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, LogOut } from 'lucide-react'
import { useQuizById, useQuizStore, evaluateScore } from '../store/quizStore.js'
import { translateQuizOptimized } from '../services/translateService.js'
import { useAuth } from '../auth/AuthContext.js'

export default function Quiz() {
  const navigate = useNavigate()
  const { id } = useParams()
  const originalQuiz = useQuizById(id)
  const { addResult } = useQuizStore()
  const { logout } = useAuth()
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
        { className: 'flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]' },
        [
          h(
            'div',
            { className: 'flex items-center gap-3' },
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
            'button',
            {
              onClick: () => {
                logout()
                navigate('/login', { replace: true })
              },
              className: 'flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm hover:bg-gray-50 transition',
            },
            [h(LogOut, { size: 16 }), 'Logout']
          ),
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
             h('p', { className: 'text-base leading-relaxed font-semibold' }, quiz?.questions[current]?.prompt)
           ),
           h(
             'div',
             { className: 'grid gap-3' },
             (quiz?.questions[current]?.options || []).map((opt, index) => {
               const isSelected = selected === opt.id
               const optionLabel = String.fromCharCode(65 + index)
               return h(
                 'button',
                 {
                   key: opt.id,
                   onClick: () => setSelected(opt.id),
                   className:
                     'text-left rounded-2xl px-4 py-4 ring-1 transition flex items-start gap-3 ' +
                     (isSelected
                       ? 'bg-[var(--color-primary)] text-white ring-transparent'
                       : 'bg-[var(--color-card)] text-[var(--color-foreground)] ring-[var(--color-border)] hover:bg-white'),
                 },
                 [
                   h(
                     'span',
                     {
                       className: 'inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg font-semibold ' +
                         (isSelected
                           ? 'bg-white/20 text-white'
                           : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]')
                     },
                     optionLabel
                   ),
                   h('span', { className: 'flex-1 pt-0.5' }, opt.text)
                 ]
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
                      navigate('/results', {
                        state: {
                          correct: result.correct,
                          total: result.total,
                          percentage: result.percentage,
                          quizTitle: quiz?.title ?? 'Kuis',
                          quizId: quiz?.id
                        }
                      })
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


