import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  /**
   * GET /users
   * Ambil semua user
   */
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  /**
   * GET /users/:id
   * Ambil detail user berdasarkan ID
   */
  async show({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return response.ok(user)
  }

  /**
   * POST /users
   * Tambah user baru
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password', 'role'])
    const user = await User.create(data)
    return response.created(user)
  }

  /**
   * PUT /users/:id
   * Update user berdasarkan ID
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['name', 'email', 'password', 'role'])
    user.merge(data)
    await user.save()
    return response.ok(user)
  }

  /**
   * DELETE /users/:id
   * Hapus user berdasarkan ID
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.ok({ message: 'User deleted successfully' })
  }
}
