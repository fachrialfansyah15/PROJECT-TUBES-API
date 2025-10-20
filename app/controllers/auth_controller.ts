import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async login({ auth, request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(data.email, data.password)
      const token = await auth.use('api').createToken(user, [], {
        expiresIn: '1 days',
      })
      return response.ok(token)
    } catch (error) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async register({ auth, request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password'])
    try {
      const user = await User.create(data)
      const token = await auth.use('api').createToken(user, [], {
        expiresIn: '1 days',
      })
      user.refresh()
      return response.ok({ user, token })
    } catch (error) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }
}
