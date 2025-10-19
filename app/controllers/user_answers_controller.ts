import type { HttpContext } from '@adonisjs/core/http'
import UserAnswer from '#models/user_answer'

export default class UserAnswersController {
  /**
   * GET /user-answers
   * Ambil semua jawaban user
   */
  async index({ response }: HttpContext) {
    const answers = await UserAnswer.query().preload('user').preload('quiz').preload('question')
    return response.ok(answers)
  }
  /**
   * GET /user-answers/:user_id
   * Ambil jawaban user tertentu
   */
  async show({ params, response }: HttpContext) {
    const answers = await UserAnswer.query()
      .where('user_id', params.user_id)
      .preload('quiz')
      .preload('question')
      .preload('user')
    return response.ok(answers)
  }

  /**
   * POST /user-answers
   * Tambah jawaban baru
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['user_id', 'quiz_id', 'question_id', 'chosen_answer', 'is_correct'])
    const answer = await UserAnswer.create(data)
    return response.created(answer)
  }

  /**
   * PUT /user-answers/:id
   * Update jawaban user (misal koreksi jawaban)
   */
  async update({ params, request, response }: HttpContext) {
    const answer = await UserAnswer.findOrFail(params.id)
    const data = request.only(['chosen_answer', 'is_correct'])
    answer.merge(data)
    await answer.save()
    return response.ok(answer)
  }

  /**
   * DELETE /user-answers/:id
   * Hapus jawaban user
   */
  async destroy({ params, response }: HttpContext) {
    const answer = await UserAnswer.findOrFail(params.id)
    await answer.delete()
    return response.ok({ message: 'User answer deleted successfully' })
  }
}
