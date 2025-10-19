import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens' // <-- Import ini

/**
 * Konfigurasi Guard untuk Opaque Access Tokens (OAT)
 */
const apiGuard = tokensGuard({
  provider: tokensUserProvider({
    // 'accessTokens' harus sesuai dengan nama relasi di User Model
    tokens: 'accessTokens',
    model: () => import('#models/User'),
  }),
  // Token prefix: Diperlukan untuk verifikasi token yang benar
  tokenProvider: {
    type: 'api', // Bisa 'api' atau yang lain.
    driver: 'database',
    table: 'access_tokens', // Nama tabel tempat token disimpan
  },
})

const authConfig = defineConfig({
  // Atur 'api' sebagai default guard untuk aplikasi API Anda
  default: 'api',

  guards: {
    // Daftarkan guard 'api' menggunakan konfigurasi OAT di atas
    api: apiGuard,
  },
})

export default authConfig
