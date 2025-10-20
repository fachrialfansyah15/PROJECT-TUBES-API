import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Quiz from './quiz.js'
import Question from './question.js'

export default class UserAnswer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare quiz_id: number

  @column()
  declare question_id: number

  @column()
  declare chosen_answer: string

  @column()
  declare is_correct: boolean

  // Relasi: jawaban ini dimiliki oleh satu user
  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  // Relasi: jawaban ini milik satu quiz
  @belongsTo(() => Quiz, {
    foreignKey: 'quiz_id',
  })
  declare quiz: BelongsTo<typeof Quiz>

  // Relasi: jawaban ini berasal dari satu pertanyaan
  @belongsTo(() => Question, {
    foreignKey: 'question_id',
  })
  declare question: BelongsTo<typeof Question>
}
