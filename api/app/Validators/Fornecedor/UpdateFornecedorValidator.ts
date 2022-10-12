import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateFornecedorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional({ trim: true }),
    descricao: schema.string.optional({ trim: true }),
    tipo: schema.string({ trim: true }),
    cpf_cnpj: schema.string.optional({ trim: true }),
    email_comercial: schema.string.optional({ trim: true }, [rules.email()]),
    telefone_comercial: schema.string.optional({ trim: true }),
    cep: schema.string.optional({ trim: true }),
    cidade: schema.string.optional({ trim: true }),
    bairro: schema.string.optional({ trim: true }),
    logradouro: schema.string.optional({ trim: true }),
    numero: schema.string.optional({ trim: true }),
    completo: schema.string.optional({ trim: true }),
    ativo: schema.boolean.optional(),
  })

  public messages: CustomMessages = {
    email: 'Email em formado invalido',
  }
}
