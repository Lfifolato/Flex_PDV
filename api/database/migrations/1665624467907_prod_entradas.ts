import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_prod_entradas'

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
      table.boolean('ref_nf')
      table.string('nro_nf')
      table.string('serie_nf')
      table.string('chave_nf')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
