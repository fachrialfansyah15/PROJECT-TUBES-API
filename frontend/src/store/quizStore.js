import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api.js'

const QuizStore = createContext(null)

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
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [results, setResults] = useState(() => readLS(LS_RESULTS, [
    { id: crypto.randomUUID(), userName: 'Budi Santoso', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 1, total: 2, percentage: 50, time: '19 Okt 2025, 09.30' },
    { id: crypto.randomUUID(), userName: 'Siti Nurhaliza', quizId: 'science', quizTitle: 'Ilmu Pengetahuan Alam', correct: 1, total: 1, percentage: 100, time: '19 Okt 2025, 10.15' },
    { id: crypto.randomUUID(), userName: 'Ahmad Rizki', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 2, total: 2, percentage: 100, time: '19 Okt 2025, 11.00' },
  ]))

  // Fetch quizzes from backend on mount
  useEffect(() => {
    fetchQuizzes()
  }, [])

  useEffect(() => writeLS(LS_RESULTS, results), [results])

  async function fetchQuizzes() {
    try {
      setLoading(true)
      setError(null)
      const response = await api.getQuizzes()
      
      // Extract data from backend response format
      const data = response.data || response
      
      // Transform backend data to frontend format
      const transformedQuizzes = data.map((quiz) => ({
        id: quiz.id.toString(),
        title: quiz.title || 'Untitled Quiz',
        description: quiz.description || 'No description',
        createdAt: new Date(quiz.created_at).toLocaleDateString('id-ID', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
        questions: Array.isArray(quiz.questions) ? quiz.questions.map((q) => ({
          id: q.id.toString(),
          prompt: q.question_text || '',
          options: [
            { id: 'a', text: q.option_a || '' },
            { id: 'b', text: q.option_b || '' },
            { id: 'c', text: q.option_c || '' },
            { id: 'd', text: q.option_d || '' },
          ],
          answerId: q.correct_answer || 'a',
        })) : [],
      }))
      
      setQuizzes(transformedQuizzes)
    } catch (err) {
      console.error('Failed to fetch quizzes:', err)
      setError(err.message || 'Failed to load quizzes')
    } finally {
      setLoading(false)
    }
  }

  async function addQuiz(input) {
    try {
      setError(null)
      
      // Create quiz on backend
      const quizData = {
        title: input.title,
        description: input.description,
      }
      
      const response = await api.createQuiz(quizData)
      
      // Extract data from backend response format
      const createdQuiz = response.data || response
      
      // Transform to frontend format
      const newQuiz = {
        id: createdQuiz.id.toString(),
        title: createdQuiz.title,
        description: createdQuiz.description,
        createdAt: new Date(createdQuiz.created_at).toLocaleDateString('id-ID', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
        questions: input.questions || [],
      }
      
      setQuizzes((prev) => [newQuiz, ...prev])
      return newQuiz.id
    } catch (err) {
      console.error('Failed to create quiz:', err)
      setError(err.message || 'Failed to create quiz')
      throw err
    }
  }

  async function updateQuiz(id, input) {
    try {
      setError(null)
      await api.updateQuiz(id, {
        title: input.title,
        description: input.description,
      })
      
      setQuizzes((prev) => prev.map((q) => 
        q.id === id ? { ...q, ...input } : q
      ))
    } catch (err) {
      console.error('Failed to update quiz:', err)
      setError(err.message || 'Failed to update quiz')
      throw err
    }
  }

  async function removeQuiz(id) {
    try {
      setError(null)
      await api.deleteQuiz(id)
      setQuizzes((prev) => prev.filter((q) => q.id !== id))
    } catch (err) {
      console.error('Failed to delete quiz:', err)
      setError(err.message || 'Failed to delete quiz')
      throw err
    }
  }

  function addResult(input) {
    const next = { ...input, id: crypto.randomUUID() }
    setResults((prev) => [next, ...prev])
  }

  function resetToDefaults() {
    localStorage.removeItem(LS_RESULTS)
    setResults([
      { id: crypto.randomUUID(), userName: 'Budi Santoso', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 4, total: 5, percentage: 80, time: '19 Okt 2025, 09.30' },
      { id: crypto.randomUUID(), userName: 'Siti Nurhaliza', quizId: 'science', quizTitle: 'Ilmu Pengetahuan Alam', correct: 3, total: 3, percentage: 100, time: '19 Okt 2025, 10.15' },
      { id: crypto.randomUUID(), userName: 'Ahmad Rizki', quizId: 'general', quizTitle: 'Pengetahuan Umum', correct: 5, total: 5, percentage: 100, time: '19 Okt 2025, 11.00' },
    ])
    fetchQuizzes()
  }

  const value = useMemo(() => ({ 
    quizzes, 
    results, 
    loading,
    error,
    addQuiz, 
    updateQuiz, 
    addResult, 
    removeQuiz, 
    resetToDefaults,
    refetch: fetchQuizzes,
  }), [quizzes, results, loading, error])
  
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
