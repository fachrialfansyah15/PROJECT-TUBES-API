import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class AuthMiddleware {
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
      return next()
    } catch (error) {
      if (ctx.request.url().startsWith('/api/')) {
        return ctx.response.unauthorized({
          success: false,
          message: 'Authentication required',
          error: 'Invalid or missing token'
        })
      }
      throw error
    }
  }
}
