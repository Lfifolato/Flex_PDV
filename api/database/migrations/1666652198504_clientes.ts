import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_cliente'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('cpf')
      table.string('email')
      table.string('telefone')
      table.boolean('notificar')
      table.string('cep')
      table.string('cidade')
      table.string('bairro')
      table.string('logradouro')
      table.string('numero')
      table
        .integer('ponto_vantagem')
        .comment(
          'ponto_vantagem e quantidade de pontos de vantagem que cliente tem disponível sendo que adicionado 100% do valor da compra'
        )
        .defaultTo(0)
      table.boolean('ativo').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
