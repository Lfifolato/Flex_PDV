import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Produto from './Produto'

export default class Fornecedor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public descricao: string

  @column()
  public tipo: string

  @column()
  public cpf_cnpj: string

  @column()
  public email_comercial: string

  @column()
  public telefone_comercial: string

  @column()
  public cep: string

  @column()
  public cidade: string

  @column()
  public bairro: string

  @column()
  public logradouro: string

  @column()
  public numero: string

  @column()
  public completo: string

  @column()
  public ativo: boolean

  @hasMany(() => Produto, {
    foreignKey: 'id_fornecedor', // defaults to userId
  })
  public Produtos: HasMany<typeof Produto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
