import User from '#models/user'
import type { JwtGuardUser } from '@maximemrf/adonisjs-jwt/types'

declare module '@adonisjs/auth/types' {
  interface GuardsList {
    jwt: {
      implementation: {
        generate(user: User): Promise<{
          type: string
          token: string
          expires_in: number
        }>
        verify(token: string): Promise<User & JwtGuardUser<User>>
      }
      config: any
    }
  }
}
