import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { quizzes as seedQuizzes } from '../data/quizzes.js'
import { translateQuiz, validateQuizLanguage, autoFixQuizLanguage } from '../utils/quizTranslator.js'

const QuizStore = createContext(null)

const LS_QUIZZES = 'quiz_store_quizzes_v1'
const LS_RESULTS = 'quiz_store_results_v1'

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function QuizStoreProvider({ children }) {
  const [quizzes, setQuizzes] = useState(() => {
    const stored = readLS(LS_QUIZZES, [])
    if (stored.length === 0) return seedQuizzes
    
    // Merge seed defaults into stored to keep dummy data consistent across views
    const byId = new Map(stored.map((q) => [q.id, q]))
    for (const seed of seedQuizzes) {
      const existing = byId.get(seed.id)
      if (!existing) {
        byId.set(seed.id, seed)
      } else {
        const merged = { ...seed, ...existing }
        // Fill missing createdAt/description from seed
        if (!existing.createdAt && seed.createdAt) merged.createdAt = seed.createdAt
        if (!existing.description && seed.description) merged.description = seed.description
        // If seed has more questions than stored, prefer seed
        const seedCount = Array.isArray(seed.questions) ? seed.questions.length : 0
        const existCount = Array.isArray(existing.questions) ? existing.questions.length : 0
        if (seedCount > existCount) merged.questions = seed.questions
        byId.set(seed.id, merged)
      }
    }
    
    // AUTO-FIX: Translate any English quiz to Bahasa Indonesia
    const allQuizzes = Array.from(byId.values())
    const translatedQuizzes = allQuizzes.map(autoFixQuizLanguage)
    
    return translatedQuizzes
  })
  const [results, setResults] = useState(() => readLS(LS_RESULTS, [
    { id: crypto.randomUUID(), userName: 'Budi Santoso', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 1, total: 2, percentage: 50, time: '19 Okt 2025, 09.30' },
    { id: crypto.randomUUID(), userName: 'Siti Nurhaliza', quizId: 'science', quizTitle: 'Ilmu Pengetahuan Alam', correct: 1, total: 1, percentage: 100, time: '19 Okt 2025, 10.15' },
    { id: crypto.randomUUID(), userName: 'Ahmad Rizki', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 2, total: 2, percentage: 100, time: '19 Okt 2025, 11.00' },
  ]))

  useEffect(() => writeLS(LS_QUIZZES, quizzes), [quizzes])
  useEffect(() => writeLS(LS_RESULTS, results), [results])

  function addQuiz(input) {
    const id = crypto.randomUUID()
    const createdAt = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    
    // AUTO-FIX: Ensure Bahasa Indonesia
    const fixed = autoFixQuizLanguage(input)
    const next = { ...fixed, id, createdAt }
    
    setQuizzes((prev) => [next, ...prev])
    return id
  }

  function updateQuiz(id, input) {
    // AUTO-FIX: Ensure Bahasa Indonesia
    const fixed = autoFixQuizLanguage(input)
    setQuizzes((prev) => prev.map((q) => q.id === id ? { ...q, ...fixed } : q))
  }
  
  function migrateQuizzesToIndonesian() {
    // Manual migration: translate all existing quizzes
    setQuizzes((prev) => prev.map(autoFixQuizLanguage))
    return { success: true, message: 'Semua kuis berhasil diperbarui ke Bahasa Indonesia' }
  }

  function addResult(input) {
    const next = { ...input, id: crypto.randomUUID() }
    setResults((prev) => [next, ...prev])
  }

  function removeQuiz(id) {
    setQuizzes((prev) => prev.filter((q) => q.id !== id))
  }

  function resetToDefaults() {
    localStorage.removeItem(LS_QUIZZES)
    localStorage.removeItem(LS_RESULTS)
    setQuizzes(seedQuizzes)
    setResults([
      { id: crypto.randomUUID(), userName: 'Budi Santoso', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 4, total: 5, percentage: 80, time: '19 Okt 2025, 09.30' },
      { id: crypto.randomUUID(), userName: 'Siti Nurhaliza', quizId: 'science', quizTitle: 'Ilmu Pengetahuan Alam', correct: 3, total: 3, percentage: 100, time: '19 Okt 2025, 10.15' },
      { id: crypto.randomUUID(), userName: 'Ahmad Rizki', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 5, total: 5, percentage: 100, time: '19 Okt 2025, 11.00' },
    ])
  }

  const value = useMemo(() => ({ 
    quizzes, 
    results, 
    addQuiz, 
    updateQuiz, 
    addResult, 
    removeQuiz, 
    resetToDefaults,
    migrateQuizzesToIndonesian 
  }), [quizzes, results])
  return React.createElement(QuizStore.Provider, { value }, children)
}

export function useQuizStore() {
  const ctx = useContext(QuizStore)
  if (!ctx) throw new Error('useQuizStore must be used within QuizStoreProvider')
  return ctx
}

export function useQuizById(id) {
  const { quizzes } = useQuizStore()
  return quizzes.find((q) => q.id === id)
}

export function evaluateScore(questions, selectedIds) {
  const total = questions.length
  let correct = 0
  questions.forEach((q, idx) => { if (selectedIds[idx] === q.answerId) correct += 1 })
  const percentage = total ? Math.round((correct / total) * 100) : 0
  return { correct, total, percentage }
}


