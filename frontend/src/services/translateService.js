/**
 * Translation Service using LibreTranslate API
 * Free API for translating quiz questions and options
 */

const LIBRE_TRANSLATE_ENDPOINTS = [
  'https://libretranslate.com/translate',
  'https://translate.argosopentech.com/translate',
  'https://translate.terraprint.co/translate'
]

let currentEndpointIndex = 0

/**
 * Detect if text is in English
 */
function isEnglish(text) {
  if (!text || typeof text !== 'string') return false
  
  const englishWords = [
    'the', 'is', 'are', 'was', 'were', 'what', 'which', 'where', 'when', 'who',
    'how', 'many', 'much', 'some', 'any', 'your', 'you', 'their', 'about'
  ]
  
  const words = text.toLowerCase().split(/\s+/)
  const englishCount = words.filter(w => englishWords.includes(w)).length
  
  return englishCount / words.length > 0.25
}

/**
 * Translate text using LibreTranslate API
 */
async function translateText(text, sourceLang = 'en', targetLang = 'id') {
  if (!text || !isEnglish(text)) {
    return text // Already Indonesian or empty
  }

  const endpoint = LIBRE_TRANSLATE_ENDPOINTS[currentEndpointIndex]
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      })
    })

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`)
    }

    const data = await response.json()
    return data.translatedText || text
  } catch (error) {
    console.warn(`Translation failed with endpoint ${endpoint}:`, error.message)
    
    currentEndpointIndex = (currentEndpointIndex + 1) % LIBRE_TRANSLATE_ENDPOINTS.length
    
    if (currentEndpointIndex === 0) {
      console.error('All translation endpoints failed, returning original text')
      return text
    }
    
    return translateText(text, sourceLang, targetLang)
  }
}

/**
 * Translate quiz question
 */
export async function translateQuestion(question) {
  if (!question) return question

  try {
    const translatedPrompt = await translateText(question.prompt)
    
    const translatedOptions = await Promise.all(
      question.options.map(async (option) => ({
        ...option,
        text: await translateText(option.text)
      }))
    )

    return {
      ...question,
      prompt: translatedPrompt,
      options: translatedOptions
    }
  } catch (error) {
    console.error('Failed to translate question:', error)
    return question // Return original on error
  }
}

/**
 * Translate entire quiz
 */
export async function translateQuiz(quiz) {
  if (!quiz || !Array.isArray(quiz.questions)) {
    return quiz
  }

  try {
    const translatedTitle = await translateText(quiz.title)
    const translatedDescription = await translateText(quiz.description)
    
    const translatedQuestions = await Promise.all(
      quiz.questions.map(q => translateQuestion(q))
    )

    return {
      ...quiz,
      title: translatedTitle,
      description: translatedDescription,
      questions: translatedQuestions
    }
  } catch (error) {
    console.error('Failed to translate quiz:', error)
    return quiz // Return original on error
  }
}

/**
 * Batch translate multiple texts (more efficient)
 */
export async function translateBatch(texts, sourceLang = 'en', targetLang = 'id') {
  const endpoint = LIBRE_TRANSLATE_ENDPOINTS[currentEndpointIndex]
  
  try {
    const textsToTranslate = texts.map((text, index) => ({
      index,
      text,
      needsTranslation: isEnglish(text)
    }))

    const translations = await Promise.all(
      textsToTranslate.map(async ({ text, needsTranslation }) => {
        if (!needsTranslation) return text
        
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              q: text,
              source: sourceLang,
              target: targetLang,
              format: 'text'
            })
          })

          if (!response.ok) {
            throw new Error(`Translation failed: ${response.status}`)
          }

          const data = await response.json()
          return data.translatedText || text
        } catch (error) {
          console.warn(`Failed to translate "${text}":`, error.message)
          return text
        }
      })
    )

    return translations
  } catch (error) {
    console.error('Batch translation failed:', error)
    return texts // Return originals on error
  }
}

/**
 * Translate quiz optimized (batch mode)
 */
export async function translateQuizOptimized(quiz) {
  if (!quiz || !Array.isArray(quiz.questions)) {
    return quiz
  }

  try {
    const textsToTranslate = [
      quiz.title,
      quiz.description,
      ...quiz.questions.flatMap(q => [
        q.prompt,
        ...q.options.map(o => o.text)
      ])
    ]

    const translated = await translateBatch(textsToTranslate)

    let index = 0
    const translatedTitle = translated[index++]
    const translatedDescription = translated[index++]
    
    const translatedQuestions = quiz.questions.map(q => {
      const translatedPrompt = translated[index++]
      const translatedOptions = q.options.map(o => ({
        ...o,
        text: translated[index++]
      }))
      
      return {
        ...q,
        prompt: translatedPrompt,
        options: translatedOptions
      }
    })

    return {
      ...quiz,
      title: translatedTitle,
      description: translatedDescription,
      questions: translatedQuestions
    }
  } catch (error) {
    console.error('Optimized translation failed:', error)
    return quiz
  }
}

/**
 * Check translation service availability
 */
export async function checkTranslationService() {
  try {
    const response = await fetch(LIBRE_TRANSLATE_ENDPOINTS[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: 'test',
        source: 'en',
        target: 'id',
        format: 'text'
      })
    })
    
    return response.ok
  } catch (error) {
    return false
  }
}

