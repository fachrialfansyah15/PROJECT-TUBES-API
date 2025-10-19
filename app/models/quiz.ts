import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Question from './question.js'
import Result from './result.js'
import UserAnswer from './user_answer.js'
import { DateTime } from 'luxon'

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare created_by: number

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @belongsTo(() => User, {
    foreignKey: 'created_by',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Question, {
    foreignKey: 'quiz_id',
  })
  declare questions: HasMany<typeof Question>

  @hasMany(() => Result, {
    foreignKey: 'quiz_id',
  })
  declare results: HasMany<typeof Result>

  @hasMany(() => UserAnswer, {
    foreignKey: 'quiz_id',
  })
  declare userAnswers: HasMany<typeof UserAnswer>
}
