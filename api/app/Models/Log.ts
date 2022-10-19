import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Log extends BaseModel {
  public static table = 'tb_log'

  @column({ isPrimary: true })
  public id: number

  @column()
  public table_name: string

  @column()
  public id_ref: number

  @column()
  public user_alter: number

  @column()
  public log: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
