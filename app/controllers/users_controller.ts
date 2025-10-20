import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  public async index({ auth, response }: HttpContext) {
    await (auth as any).use('api').authenticate()
    const users = await User.all()
    return response.ok(users)
  }

  public async show({ auth, params, response }: HttpContext) {
    await (auth as any).use('api').authenticate()
    const user = await User.findOrFail(params.id)
    return response.ok(user)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password', 'role'])
    const user = await User.create(data)
    return response.created(user)
  }

  public async update({ auth, params, request, response }: HttpContext) {
    await (auth as any).use('api').authenticate()
    const user = await User.findOrFail(params.id)
    const data = request.only(['name', 'email', 'password', 'role'])
    user.merge(data)
    await user.save()
    return response.ok(user)
  }

  public async destroy({ auth, params, response }: HttpContext) {
    await (auth as any).use('api').authenticate()
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.ok({ message: 'User deleted successfully' })
  }
}
