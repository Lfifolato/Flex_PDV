import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional({ trim: true }),
    cpf: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    password: schema.string.optional({ trim: true }),
    admin: schema.boolean.optional(),
    ativo: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    email: 'Email em formado invalido',
  }
}
