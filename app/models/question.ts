import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Quiz from './quiz.js'
import UserAnswer from './user_answer.js'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare quiz_id: number

  @column()
  declare question_text: string

  @column()
  declare option_a: string

  @column()
  declare option_b: string

  @column()
  declare option_c: string

  @column()
  declare option_d: string

  @column()
  declare correct_answer: string

  @belongsTo(() => Quiz, {
    foreignKey: 'quiz_id',
  })
  declare quiz: BelongsTo<typeof Quiz>

  @hasMany(() => UserAnswer, {
    foreignKey: 'question_id',
  })
  declare userAnswers: HasMany<typeof UserAnswer>
}
