import type { HttpContext } from '@adonisjs/core/http'
import Quiz from '#models/quiz'

export default class QuizzesController {
  /**
   * GET /quizzes
   * Ambil semua data quiz
   */
  async index({ response }: HttpContext) {
    const quizzes = await Quiz.query().preload('user').preload('questions')
    return response.ok(quizzes)
  }

  /**
   * GET /quizzes/:id
   * Ambil detail quiz berdasarkan id
   */
  async show({ params, response }: HttpContext) {
    const quiz = await Quiz.query()
      .where('id', params.id)
      .preload('user')
      .preload('questions')
      .firstOrFail()

    return response.ok(quiz)
  }

  /**
   * POST /quizzes
   * Tambah quiz baru
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'description', 'created_by'])
    const quiz = await Quiz.create(data)
    return response.created(quiz)
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
