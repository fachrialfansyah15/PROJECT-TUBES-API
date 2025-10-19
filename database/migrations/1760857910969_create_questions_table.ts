import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('quiz_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('quizzes')
        .onDelete('CASCADE')
      table.text('question_text').notNullable()
      table.string('option_a', 255).notNullable()
      table.string('option_b', 255).notNullable()
      table.string('option_c', 255).notNullable()
      table.string('option_d', 255).notNullable()
      table.string('correct_answer', 1).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
