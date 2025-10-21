import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Development Configuration
  |--------------------------------------------------------------------------
  |
  | Configuration for development environment
  |
  */

  /*
  |--------------------------------------------------------------------------
  | CORS Configuration for Development
  |--------------------------------------------------------------------------
  |
  | Allow requests from frontend development servers
  |
  */
  cors: {
    enabled: true,
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
    ],
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    headers: true,
    credentials: true,
  },

  /*
  |--------------------------------------------------------------------------
  | Logging Configuration
  |--------------------------------------------------------------------------
  |
  | Enhanced logging for development
  |
  */
  logger: {
    level: 'debug',
    prettyPrint: true,
  },
})
