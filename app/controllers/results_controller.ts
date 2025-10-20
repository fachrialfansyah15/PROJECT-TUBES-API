import type { HttpContext } from '@adonisjs/core/http'
import Result from '#models/result'

export default class ResultsController {
  /**
   * GET /results
   * Ambil semua hasil quiz
   */
  async index({ response }: HttpContext) {
    const results = await Result.query().preload('user').preload('quiz')
    return response.ok(results)
  }

  /**
   * GET /results/:user_id
   * Ambil hasil quiz user tertentu
   */
  async show({ params, response }: HttpContext) {
    const results = await Result.query()
      .where('user_id', params.user_id)
      .preload('quiz')
      .preload('user')
    return response.ok(results)
  }

  /**
   * POST /results
   * Tambah hasil quiz baru (misal setelah submit)
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['user_id', 'quiz_id', 'score'])
    const result = await Result.create(data)
    return response.created(result)
  }

  /**
   * PUT /results/:id
   * Update hasil quiz (misal koreksi score)
   */
  async update({ params, request, response }: HttpContext) {
    const result = await Result.findOrFail(params.id)
    const data = request.only(['score'])
    result.merge(data)
    await result.save()
    return response.ok(result)
  }

  /**
   * DELETE /results/:id
   * Hapus hasil quiz
   */
  async destroy({ params, response }: HttpContext) {
    const result = await Result.findOrFail(params.id)
    await result.delete()
    return response.ok({ message: 'Result deleted successfully' })
  }
}
