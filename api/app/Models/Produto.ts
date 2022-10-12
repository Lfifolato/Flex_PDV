import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_fornecedor: number

  @column()
  public nome: string

  @column()
  public descricao: string

  @column()
  public vlr_custo: number

  @column()
  public per_lucro: number

  @column()
  public vlr_venda: number

  @column()
  public qtd_estoque: number

  @column()
  public ativo: boolean

  @beforeSave()
  public static async geraCustoProduto(produto: Produto) {
    produto.vlr_venda = produto.vlr_custo + (produto.vlr_custo * produto.per_lucro) / 100
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
