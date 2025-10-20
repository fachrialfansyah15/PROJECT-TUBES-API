import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])

    const user = await User.create({
      email: data.email,
      password: await hash.make(data.password),
    })

    return response.created({ user })
  }

  async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) return response.unauthorized('Invalid credentials')

    const isValid = await hash.verify(user.password, password)
    if (!isValid) return response.unauthorized('Invalid credentials')

    // 👇 tambahkan ini
    const jwt: any = auth.use('jwt')
    const token = await jwt.generate(user)

    return { token }
  }
}
