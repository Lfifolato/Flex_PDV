import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProdEntrada extends BaseModel {
  public static table = 'tb_prod_entradas'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_Produto: number

  @column()
  public qtd_produto: number

  @column()
  public ref_nf: boolean

  @column()
  public nro_nf: string

  @column()
  public serie_nf: string

  @column()
  public chave_nf: string

  @column()
  public dta_nf: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
