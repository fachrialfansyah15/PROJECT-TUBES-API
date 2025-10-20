import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'
import Quiz from './quiz.js'

export default class Result extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare quiz_id: number

  @column()
  declare score: number

  @column.dateTime({ autoCreate: true })
  declare submitted_at: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Quiz, {
    foreignKey: 'quiz_id',
  })
  declare quiz: BelongsTo<typeof Quiz>
}
