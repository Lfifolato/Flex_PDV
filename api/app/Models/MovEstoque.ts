import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MovEstoque extends BaseModel {
  public static table = 'tb_mov_estoque'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_Produto: number

  @column()
  public tipo: string

  @column()
  public quantidade: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
