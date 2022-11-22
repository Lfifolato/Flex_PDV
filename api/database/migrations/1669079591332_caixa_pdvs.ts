import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_caixa_pdv'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('id_operador')
        .unsigned()
        .references('id')
        .inTable('tb_user')
        .onDelete('CASCADE')
      table.integer('id_pdv').unsigned().references('id').inTable('tb_pdv').onDelete('CASCADE')
      table.float('salto_inicial').defaultTo(0)
      table.float('salto_atual').defaultTo(0)
      table.float('dif_salto').defaultTo(0)
      table.string('data_create')
      table.boolean('ativo').defaultTo(true)
      table
        .integer('id_user')
        .unsigned()
        .references('id')
        .inTable('tb_user')
        .onDelete('CASCADE')
        .comment('Finalizado que autorizou o fechamento do caixas')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
