import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_mov_estoque'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('id_Produto')
        .unsigned()
        .references('id')
        .inTable('tb_produto')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('tipo').comment('E = Entrada, S = Saida')
      table.integer('quantidade')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
