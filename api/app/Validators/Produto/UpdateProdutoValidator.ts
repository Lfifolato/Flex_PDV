import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProdutoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_fornecedor: schema.number.optional(),
    nome: schema.string.optional({ trim: true }),
    descricao: schema.string.optional({ trim: true }),
    vlr_custo: schema.number.optional(),
    per_lucro: schema.number.optional(),
    ativo: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
