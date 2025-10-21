import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: 'admin@quiz.com' },
      {
        email: 'admin@quiz.com',
        password: await hash.make('admin123'),
        name: 'Admin User',
        role: 'admin',
      }
    )

    await User.updateOrCreate(
      { email: 'user@quiz.com' },
      {
        email: 'user@quiz.com',
        password: await hash.make('user123'),
        name: 'Regular User',
        role: 'user',
      }
    )

    console.log('✅ Default users created:')
    console.log('   - admin@quiz.com / admin123')
    console.log('   - user@quiz.com / user123')
  }
}

