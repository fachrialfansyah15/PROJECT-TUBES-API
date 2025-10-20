import type { HttpContext } from '@adonisjs/core/http'

export default class GuestMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    try {
      await (auth as any).use('api').authenticate()
      return response.unauthorized({ message: 'Already authenticated' })
    } catch (error) {
      await next()
    }
  }
}
