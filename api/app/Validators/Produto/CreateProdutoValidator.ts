import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProdutoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_fornecedor: schema.number(),
    nome: schema.string({ trim: true }),
    descricao: schema.string({ trim: true }),
    bar_cod: schema.string({ trim: true }),
    vlr_custo: schema.number(),
    per_lucro: schema.number(),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
  }
}
