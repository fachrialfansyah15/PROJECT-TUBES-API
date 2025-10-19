import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Quiz from './quiz.js'
import Result from './result.js'
import UserAnswer from './user_answer.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'admin' | 'user'

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User)

  // Relasi: 1 User bisa punya banyak Quiz
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
}
