import type { HttpContext } from '@adonisjs/core/http'
import Question from '#models/question'

export default class QuestionsController {
  /**
   * GET /questions
   * Ambil semua pertanyaan
   */
  async index({ response }: HttpContext) {
    const questions = await Question.query().preload('quiz')
    return response.ok(questions)
  }

  /**
   * GET /questions/:id
   * Ambil detail pertanyaan berdasarkan ID
   */
  async show({ params, response }: HttpContext) {
    const question = await Question.query().where('id', params.id).preload('quiz').firstOrFail()

    return response.ok(question)
  }

  /**
   * POST /questions
   * Tambah pertanyaan baru
   */
  async store({ request, response }: HttpContext) {
    const data = request.only([
      'quiz_id',
      'question_text',
      'option_a',
      'option_b',
      'option_c',
      'option_d',
      'correct_answer',
    ])
    const question = await Question.create(data)
    return response.created(question)
  }

  /**
   * PUT /questions/:id
   * Update pertanyaan berdasarkan ID
   */
  async update({ params, request, response }: HttpContext) {
    const question = await Question.findOrFail(params.id)
    const data = request.only([
      'quiz_id',
      'question_text',
      'option_a',
      'option_b',
      'option_c',
      'option_d',
      'correct_answer',
    ])
    question.merge(data)
    await question.save()
    return response.ok(question)
  }

  /**
   * DELETE /questions/:id
   * Hapus pertanyaan berdasarkan ID
   */
  async destroy({ params, response }: HttpContext) {
    const question = await Question.findOrFail(params.id)
    await question.delete()
    return response.ok({ message: 'Question deleted successfully' })
  }
}
