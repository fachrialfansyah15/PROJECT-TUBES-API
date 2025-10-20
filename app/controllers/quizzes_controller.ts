import type { HttpContext } from '@adonisjs/core/http'
import Quiz from '#models/quiz'
import Question from '#models/question'

export default class QuizzesController {
  /**
   * GET /quizzes
   * Ambil semua data quiz
   */
  async index({ response }: HttpContext) {
    try {
      const quizzes = await Quiz.query()
        .preload('user')
        .preload('questions')
        .orderBy('created_at', 'desc')
      
      return response.ok({
        success: true,
        data: quizzes,
        message: 'Quizzes retrieved successfully'
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Failed to retrieve quizzes',
        error: error.message
      })
    }
  }

  /**
   * GET /quizzes/:id
   * Ambil detail quiz berdasarkan id
   */
  async show({ params, response }: HttpContext) {
    try {
      const quiz = await Quiz.query()
        .where('id', params.id)
        .preload('user')
        .preload('questions')
        .firstOrFail()

      return response.ok({
        success: true,
        data: quiz,
        message: 'Quiz retrieved successfully'
      })
    } catch (error) {
      return response.notFound({
        success: false,
        message: 'Quiz not found',
        error: error.message
      })
    }
  }

  /**
   * POST /quizzes
   * Tambah quiz baru
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const data = request.only(['title', 'description', 'questions'])
      const userId = await auth.user?.id || 1 // Default to user ID 1 if not authenticated
      
      // Validasi input
      if (!data.title || data.title.trim() === '') {
        return response.badRequest({
          success: false,
          message: 'Title is required'
        })
      }
      
      const quiz = await Quiz.create({
        title: data.title.trim(),
        description: data.description?.trim() || '',
        created_by: userId,
      })
      
      // Simpan questions jika ada
      if (data.questions && Array.isArray(data.questions)) {
        for (const q of data.questions) {
          await Question.create({
            quiz_id: quiz.id,
            question_text: q.prompt || '',
            option_a: q.options?.[0]?.text || '',
            option_b: q.options?.[1]?.text || '',
            option_c: q.options?.[2]?.text || '',
            option_d: q.options?.[3]?.text || '',
            correct_answer: q.answerId || 'a',
          })
        }
      }
      
      // Load dengan questions
      await quiz.load('questions')
      
      return response.created({
        success: true,
        data: quiz,
        message: 'Quiz created successfully'
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Failed to create quiz',
        error: error.message
      })
    }
  }

  /**
   * PUT /quizzes/:id
   * Update quiz berdasarkan id
   */
  async update({ params, request, response }: HttpContext) {
    const quiz = await Quiz.findOrFail(params.id)
    const data = request.only(['title', 'description'])
    quiz.merge(data)
    await quiz.save()
    return response.ok(quiz)
  }

  /**
   * DELETE /quizzes/:id
   * Hapus quiz berdasarkan id
   */
  async destroy({ params, response }: HttpContext) {
    const quiz = await Quiz.findOrFail(params.id)
    await quiz.delete()
    return response.ok({ message: 'Quiz deleted successfully' })
  }
}
