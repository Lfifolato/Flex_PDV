import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class CaixaPdv extends BaseModel {
  public static table = 'tb_caixa_pdv'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_operador: number

  @column()
  public id_pdv: number

  @column()
  public salto_inicial: number

  @column()
  public salto_atual: number

  @column()
  public dif_salto: number

  @column()
  public data_create: string

  @column()
  public ativo: boolean

  @column()
  public id_user: number

  @hasOne(() => User, { foreignKey: 'id_operador', localKey: 'id' })
  public User: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
