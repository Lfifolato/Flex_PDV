import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cliente extends BaseModel {
  public static table = 'tb_cliente'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cpf: string

  @column()
  public email: string

  @column()
  public telefone: string

  @column()
  public notificar: boolean

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
  public ativo: boolean

  @column()
  public ponto_vantagem: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
