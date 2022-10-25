import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }),
    cpf: schema.string({ trim: true }, [rules.unique({ table: 'tb_cliente', column: 'cpf' })]),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    telefone: schema.string.optional({ trim: true }),
    notificar: schema.boolean(),
    cep: schema.string.optional({ trim: true }),
    cidade: schema.string.optional({ trim: true }),
    bairro: schema.string.optional({ trim: true }),
    logradouro: schema.string.optional({ trim: true }),
    numero: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
    email: 'Email em formado invalido',
    unique: 'Já existe Cliente com esse cpf',
  }
}
