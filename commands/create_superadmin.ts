import { BaseCommand } from '@adonisjs/core/ace'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash' // versi tanpa ioc untuk Adonis v6

export default class CreateSuperadmin extends BaseCommand {
  static commandName = 'make:superadmin'
  static description = 'Buat akun superadmin default'

  async run() {
    const email = 'superadmin@example.com'
    const plainPassword = 'superadmin123'

    // Gunakan Hash.make (huruf besar!)
    const password = await Hash.make(plainPassword)

    let user = await User.findBy('email', email)

    if (user) {
      user.merge({
        name: 'Super Admin',
        password,
        role: 'superadmin',
      })
      await user.save()
      this.logger.info('Superadmin sudah ada — data diperbarui.')
    } else {
      user = await User.create({
        name: 'Super Admin',
        email,
        password,
        role: 'superadmin',
      })
      this.logger.info('Superadmin berhasil dibuat.')
    }

    this.logger.success(`✅ Superadmin: ${user.email}`)
  }
}
