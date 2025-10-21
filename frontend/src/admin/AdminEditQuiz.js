import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuizStore, useQuizById } from '../store/quizStore.js'

const h = React.createElement

export default function AdminEditQuiz() {
  const { id } = useParams()
  const { updateQuiz, refetch } = useQuizStore()
  const quiz = useQuizById(id)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([mkQuestion()])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!quiz) {
      setNotFound(true)
    } else {
      setTitle(quiz.title || '')
      setDescription(quiz.description || '')
      setQuestions(quiz.questions && quiz.questions.length > 0 ? quiz.questions : [mkQuestion()])
    }
  }, [quiz])

  function mkOption(label) {
    return { id: crypto.randomUUID(), text: label }
  }
  function mkQuestion() {
    const a = mkOption('Opsi A'), b = mkOption('Opsi B'), c = mkOption('Opsi C'), d = mkOption('Opsi D')
    return { id: crypto.randomUUID(), prompt: '', options: [a, b, c, d], answerId: a.id }
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, mkQuestion()])
  }
  function updateQuestionPrompt(qid, value) {
    setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, prompt: value } : q)))
  }
  function updateOption(qid, oid, value) {
    setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, options: q.options.map((o) => (o.id === oid ? { ...o, text: value } : o)) } : q)))
  }
  function setAnswer(qid, oid) {
    setQuestions((prev) => prev.map((q) => (q.id === qid ? { ...q, answerId: oid } : q)))
  }
  async function saveQuiz() {
    const payload = {
      title,
      description,
      questions: questions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options.map((o) => ({ id: o.id, text: o.text })), answerId: q.answerId })),
    }
    
    try {
      await updateQuiz(id, payload)
      navigate('/admin/manage', { state: { message: 'Kuis berhasil diperbarui.' } })
    } catch (error) {
      console.error('Failed to update quiz:', error)
    }
  }

  if (notFound) {
    return h(
      'div',
      { className: 'space-y-6' },
      [
        h('div', { className: 'rounded-2xl border border-red-200 bg-red-50 p-6 text-center' }, [
          h('h2', { className: 'text-xl font-semibold text-red-900' }, 'Kuis Tidak Ditemukan'),
          h('p', { className: 'mt-2 text-red-700' }, 'Kuis dengan ID ini tidak ada di sistem.'),
          h('button', {
            onClick: () => navigate('/admin/manage'),
            className: 'mt-4 rounded-xl bg-red-600 px-4 py-2 text-white'
          }, 'Kembali ke Kelola Kuis'),
        ])
      ]
    )
  }

  return h(
    'div',
    { className: 'space-y-6' },
    [
      h('div', { key: 'breadcrumb', className: 'text-sm text-[var(--color-muted)]' }, 'Kembali · Edit Kuis'),
      h('section', { key: 'quiz-info', className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
        h('div', { key: 'section-title', className: 'mb-4 font-medium' }, 'Informasi Kuis'),
        h('div', { key: 'form-fields', className: 'grid gap-4' }, [
          h('div', { key: 'title-field', className: 'grid gap-2' }, [
            h('label', { key: 'title-label', className: 'text-sm' }, 'Judul Kuis'),
            h('input', { key: 'title-input', className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3', placeholder: 'Masukkan judul kuis', value: title, onChange: (e) => setTitle(e.target.value) }),
          ]),
          h('div', { key: 'description-field', className: 'grid gap-2' }, [
            h('label', { key: 'description-label', className: 'text-sm' }, 'Deskripsi'),
            h('textarea', { key: 'description-input', className: 'min-h-24 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2', placeholder: 'Masukkan deskripsi kuis', value: description, onChange: (e) => setDescription(e.target.value) }),
          ]),
        ]),
      ]),
      h('section', { key: 'questions-section', className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
        h('div', { key: 'questions-title', className: 'mb-4 font-medium' }, 'Pertanyaan'),
        h(
          'div',
          { key: 'questions-list', className: 'space-y-6' },
          questions.map((q, idx) =>
            h('div', { key: q.id, className: 'rounded-xl border border-[var(--color-border)] bg-white p-4' }, [
              h('div', { key: 'question-field', className: 'mb-3 grid gap-2' }, [
                h('label', { key: 'question-label', className: 'text-sm' }, 'Pertanyaan'),
                h('input', { key: 'question-input', className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3', placeholder: 'Masukkan pertanyaan', value: q.prompt, onChange: (e) => updateQuestionPrompt(q.id, e.target.value) }),
              ]),
              h(
                'div',
                { key: 'options-container', className: 'grid gap-3 md:grid-cols-2' },
                q.options.map((o, i) =>
                  h('div', { key: o.id, className: 'grid gap-2' }, [
                    h('label', { key: `option-label-${i}`, className: 'text-sm' }, `Pilihan ${String.fromCharCode(65 + i)}`),
                    h('input', { key: `option-input-${i}`, className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3', placeholder: `Opsi ${String.fromCharCode(65 + i)}`, value: o.text, onChange: (e) => updateOption(q.id, o.id, e.target.value) }),
                  ])
                )
              ),
              h('div', { key: 'answer-section', className: 'mt-4 grid gap-2' }, [
                h('div', { key: 'answer-label', className: 'text-sm' }, 'Jawaban Benar'),
                h(
                  'div',
                  { key: 'answer-options', className: 'flex items-center gap-4 text-sm' },
                  q.options.map((o, i) =>
                    h('label', { key: o.id, className: 'inline-flex items-center gap-2' }, [
                      h('input', { key: `radio-${i}`, type: 'radio', name: `ans-${idx}`, checked: q.answerId === o.id, onChange: () => setAnswer(q.id, o.id) }),
                      String.fromCharCode(65 + i),
                    ])
                  )
                ),
              ]),
            ])
          )
        ),
        h('button', { key: 'add-question-btn', onClick: addQuestion, className: 'w-full rounded-lg bg-[var(--color-primary)]/90 px-4 py-3 text-white' }, '+ Tambah Pertanyaan'),
      ]),
      h('div', { key: 'action-buttons', className: 'grid grid-cols-2 gap-4' }, [
        h('button', { key: 'cancel-btn', onClick: () => navigate('/admin/manage'), className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white' }, 'Batal'),
        h('button', { key: 'save-btn', onClick: saveQuiz, className: 'h-11 rounded-xl bg-[var(--color-primary)] text-white' }, 'Perbarui Kuis'),
      ]),
    ]
  )
}


