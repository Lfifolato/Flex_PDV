import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProdEntradaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_produto: schema.number(),
    qtd_entrada: schema.number(),
    ref_nf: schema.boolean(),
    nro_nf: schema.string.optional({ trim: true }),
    serie_nf: schema.string.optional({ trim: true }),
    chave_nf: schema.string.optional({ trim: true }),
    dta_nf: schema.date.optional({}),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
  }
}
