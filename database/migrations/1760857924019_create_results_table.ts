import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Results extends BaseSchema {
  protected tableName = 'results'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .integer('quiz_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('quizzes')
        .onDelete('CASCADE')
      table.integer('score').defaultTo(0)
      table.timestamp('submitted_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
