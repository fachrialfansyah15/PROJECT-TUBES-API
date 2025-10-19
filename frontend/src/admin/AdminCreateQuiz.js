import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '../store/quizStore.js'

const h = React.createElement

export default function AdminCreateQuiz() {
  const { addQuiz } = useQuizStore()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([mkQuestion()])

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
  function saveQuiz() {
    const payload = {
      title,
      description,
      questions: questions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options.map((o) => ({ id: o.id, text: o.text })), answerId: q.answerId })),
    }
    const id = addQuiz(payload)
    navigate(`/quiz/${id}`)
  }

  return h(
    'div',
    { className: 'space-y-6' },
    [
      h('div', { className: 'text-sm text-[var(--color-muted)]' }, 'Kembali · Buat Kuis Baru'),
      h('section', { className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
        h('div', { className: 'mb-4 font-medium' }, 'Informasi Kuis'),
        h('div', { className: 'grid gap-4' }, [
          h('div', { className: 'grid gap-2' }, [
            h('label', { className: 'text-sm' }, 'Judul Kuis'),
            h('input', { className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3', placeholder: 'Masukkan judul kuis', value: title, onChange: (e) => setTitle(e.target.value) }),
          ]),
          h('div', { className: 'grid gap-2' }, [
            h('label', { className: 'text-sm' }, 'Deskripsi'),
            h('textarea', { className: 'min-h-24 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2', placeholder: 'Masukkan deskripsi kuis', value: description, onChange: (e) => setDescription(e.target.value) }),
          ]),
        ]),
      ]),
      h('section', { className: 'rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5' }, [
        h('div', { className: 'mb-4 font-medium' }, 'Tambah Pertanyaan'),
        h(
          'div',
          { className: 'space-y-6' },
          questions.map((q, idx) =>
            h('div', { key: q.id, className: 'rounded-xl border border-[var(--color-border)] bg-white p-4' }, [
              h('div', { className: 'mb-3 grid gap-2' }, [
                h('label', { className: 'text-sm' }, 'Pertanyaan'),
                h('input', { className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3', placeholder: 'Masukkan pertanyaan', value: q.prompt, onChange: (e) => updateQuestionPrompt(q.id, e.target.value) }),
              ]),
              h(
                'div',
                { className: 'grid gap-3 md:grid-cols-2' },
                q.options.map((o, i) =>
                  h('div', { key: o.id, className: 'grid gap-2' }, [
                    h('label', { className: 'text-sm' }, `Pilihan ${String.fromCharCode(65 + i)}`),
                    h('input', { className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white px-3', placeholder: `Opsi ${String.fromCharCode(65 + i)}`, value: o.text, onChange: (e) => updateOption(q.id, o.id, e.target.value) }),
                  ])
                )
              ),
              h('div', { className: 'mt-4 grid gap-2' }, [
                h('div', { className: 'text-sm' }, 'Jawaban Benar'),
                h(
                  'div',
                  { className: 'flex items-center gap-4 text-sm' },
                  q.options.map((o, i) =>
                    h('label', { key: o.id, className: 'inline-flex items-center gap-2' }, [
                      h('input', { type: 'radio', name: `ans-${idx}`, checked: q.answerId === o.id, onChange: () => setAnswer(q.id, o.id) }),
                      String.fromCharCode(65 + i),
                    ])
                  )
                ),
              ]),
            ])
          )
        ),
        h('button', { onClick: addQuestion, className: 'w-full rounded-lg bg-[var(--color-primary)]/90 px-4 py-3 text-white' }, '+ Tambah Pertanyaan'),
      ]),
      h('div', { className: 'grid grid-cols-2 gap-4' }, [
        h('button', { onClick: () => navigate(-1), className: 'h-11 rounded-xl border border-[var(--color-border)] bg-white' }, 'Batal'),
        h('button', { onClick: saveQuiz, className: 'h-11 rounded-xl bg-[var(--color-primary)] text-white' }, 'Simpan Kuis'),
      ]),
    ]
  )
}


