import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'
import env from '#start/env'
import User from '#models/user'

const authConfig = defineConfig({
  default: 'jwt',

  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),

    jwt: jwtGuard({
      tokenName: 'token',
      tokenExpiresIn: '1h',
      useCookies: false,
      secret: env.get('JWT_SECRET'),

      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),

      // ✅ gunakan getOriginal() untuk ambil properti model User
      content: (user) => ({
        userId: user.getId(),
        email: (user.getOriginal() as User).email,
      }),
    }),
  },
})

export default authConfig
