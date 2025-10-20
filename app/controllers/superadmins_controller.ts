import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SuperAdminController {
  public async updateRole({ params, request, auth, response }: HttpContext) {
    const currentUser = auth.user!
    if (currentUser.role !== 'superadmin') {
      return response.forbidden({ message: 'Access ditolak' })
    }

    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'User tidak ditemukan' })
    }

    const newRole = request.input('role')

    if (!['user', 'admin'].includes(newRole)) {
      return response.badRequest({ message: 'Invalid role' })
    }

    user.role = newRole
    await user.save()

    return response.ok({
      message: `User ${user.email} promoted to ${newRole}`,
      user,
    })
  }
}
