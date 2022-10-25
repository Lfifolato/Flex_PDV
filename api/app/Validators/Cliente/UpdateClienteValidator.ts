import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional({ trim: true }),
    cpf: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }),
    telefone: schema.string.optional({ trim: true }),
    notificar: schema.boolean.optional(),
    cep: schema.string.optional({ trim: true }),
    cidade: schema.string.optional({ trim: true }),
    bairro: schema.string.optional({ trim: true }),
    logradouro: schema.string.optional({ trim: true }),
    numero: schema.string.optional({ trim: true }),
    ativo: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
