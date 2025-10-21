const QUIZ_TRANSLATIONS = {
  'General Knowledge': {
    title: 'Pengetahuan Umum',
    description: 'Campuran fakta sehari-hari untuk memulai'
  },
  'Science': {
    title: 'Ilmu Pengetahuan Alam',
    description: 'Uji pengetahuanmu tentang dunia alam'
  },
  'Mathematics': {
    title: 'Matematika',
    description: 'Uji kemampuan matematika Anda'
  },
  'History': {
    title: 'Sejarah',
    description: 'Uji pengetahuan sejarah Anda'
  },
  'Geography': {
    title: 'Geografi',
    description: 'Uji pengetahuan geografi Anda'
  }
}

const ENGLISH_PATTERNS = [
  'A mix of everyday facts',
  'Test your knowledge',
  'everyday facts to get you started',
  'about the natural world',
  'What is',
  'How many',
  'Which',
  'Where is'
]

/**
 * Deteksi apakah text menggunakan Bahasa Inggris
 */
export function isEnglish(text) {
  if (!text) return false
  
  for (const pattern of ENGLISH_PATTERNS) {
    if (text.includes(pattern)) return true
  }
  
  const englishWords = ['the', 'is', 'are', 'your', 'you', 'about', 'what', 'which', 'where', 'how']
  const words = text.toLowerCase().split(/\s+/)
  const englishCount = words.filter(w => englishWords.includes(w)).length
  
  return englishCount / words.length > 0.3
}

/**
 * Translate quiz title
 */
export function translateQuizTitle(title) {
  if (!title) return title
  
  if (QUIZ_TRANSLATIONS[title]) {
    return QUIZ_TRANSLATIONS[title].title
  }
  
  return title
}

/**
 * Translate quiz description
 */
export function translateQuizDescription(title, description) {
  if (!description) return description
  
  if (QUIZ_TRANSLATIONS[title]) {
    return QUIZ_TRANSLATIONS[title].description
  }
  
  return description
}

/**
 * Translate entire quiz object
 */
export function translateQuiz(quiz) {
  if (!quiz) return quiz
  
  const translated = { ...quiz }
  
  if (isEnglish(quiz.title)) {
    translated.title = translateQuizTitle(quiz.title)
  }
  
  if (isEnglish(quiz.description)) {
    translated.description = translateQuizDescription(quiz.title, quiz.description)
  }
  
  return translated
}

/**
 * Translate array of quizzes
 */
export function translateQuizzes(quizzes) {
  if (!Array.isArray(quizzes)) return quizzes
  return quizzes.map(translateQuiz)
}

/**
 * Validate quiz data untuk memastikan Bahasa Indonesia
 */
export function validateQuizLanguage(quiz) {
  const issues = []
  
  if (isEnglish(quiz.title)) {
    issues.push({
      field: 'title',
      value: quiz.title,
      suggestion: translateQuizTitle(quiz.title)
    })
  }
  
  if (isEnglish(quiz.description)) {
    issues.push({
      field: 'description',
      value: quiz.description,
      suggestion: translateQuizDescription(quiz.title, quiz.description)
    })
  }
  
  if (Array.isArray(quiz.questions)) {
    quiz.questions.forEach((q, idx) => {
      if (isEnglish(q.prompt)) {
        issues.push({
          field: `questions[${idx}].prompt`,
          value: q.prompt,
          suggestion: 'Harap gunakan Bahasa Indonesia'
        })
      }
    })
  }
  
  return {
    isValid: issues.length === 0,
    issues
  }
}

/**
 * Auto-fix quiz language
 * Translate semua yang terdeteksi Bahasa Inggris
 */
export function autoFixQuizLanguage(quiz) {
  return translateQuiz(quiz)
}

