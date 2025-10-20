import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Quiz from './quiz.js'
import Result from './result.js'
import UserAnswer from './user_answer.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'admin' | 'user'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Quiz, {
    foreignKey: 'created_by',
  })
  declare quizzes: HasMany<typeof Quiz>

  @hasMany(() => Result, {
    foreignKey: 'user_id',
  })
  declare results: HasMany<typeof Result>

  @hasMany(() => UserAnswer, {
    foreignKey: 'user_id',
  })
  declare userAnswers: HasMany<typeof UserAnswer>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
