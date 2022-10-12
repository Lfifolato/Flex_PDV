import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }),
    cpf: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'cpf' })]),
    email: schema.string({ trim: true }, [
      rules.unique({ table: 'users', column: 'email' }),
      rules.email(),
    ]),
    password: schema.string({ trim: true }),
    admin: schema.boolean(),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
    unique: 'O campo {{ field }} já esta cadastrado',
    email: 'Email em formado invalido',
  }
}
