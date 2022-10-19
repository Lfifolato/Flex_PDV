import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tb_fornecedor'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('descricao')
      table.string('tipo').comment('F = Pessoal Física J = Pessoa Jurídica')
      table.string(`cpf_cnpj`)
      table.string('email_comercial')
      table.string('telefone_comercial')
      table.string('cep')
      table.string('cidade')
      table.string('bairro')
      table.string('logradouro')
      table.string('numero')
      table.string('completo')
      table.boolean('ativo').defaultTo(true)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
