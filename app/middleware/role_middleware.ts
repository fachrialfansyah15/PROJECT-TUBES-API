import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export default class RoleMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, allowedRoles: string[]) {
    // Pastikan pengguna sudah login
    await auth.check()
    const user = auth.user as User  // ✅ beri tahu TypeScript bahwa ini adalah model User

    // Jika user tidak ditemukan (tidak login)
    if (!user) {
      return response.unauthorized({ message: 'Unauthorized' })
    }

    // Cek apakah role user termasuk dalam roles yang diizinkan
    if (!allowedRoles.includes(user.role)) {
      return response.forbidden({ message: 'Access denied' })
    }

    // Lanjut ke proses berikutnya
    await next()
  }
}
