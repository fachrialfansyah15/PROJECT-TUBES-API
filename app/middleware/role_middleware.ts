import type { HttpContext } from '@adonisjs/core/http'

export default class RoleMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>, roles: string[]) {
    try {
      const user = await (auth as any).use('api').authenticate()
      if (!roles.includes(user.role)) {
        return response.unauthorized({ message: 'Insufficient permissions' })
      }
      await next()
    } catch (error) {
      return response.unauthorized({ message: 'Authentication required' })
    }
  }
}
