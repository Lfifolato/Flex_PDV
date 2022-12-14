import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_produto'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('id_fornecedor')
        .unsigned()
        .references('id')
        .inTable('tb_fornecedor')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('nome')
      table.string('descricao')
      table.string('bar_cod', 50)
      table.float('vlr_custo')
      table.float('per_lucro').comment('Porcentagem de lucro na venda do produto')
      table.float('vlr_venda')
      table.integer('qtd_estoque').defaultTo(0)
      table.boolean('ativo').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
