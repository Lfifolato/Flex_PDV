import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateFornecedorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }),
    descricao: schema.string({ trim: true }),
    tipo: schema.string({ trim: true }),
    cpf_cnpj: schema.string({ trim: true }, [
      rules.unique({ table: 'tb_fornecedor', column: 'cpf_cnpj' }),
    ]),
    email_comercial: schema.string({ trim: true }, [rules.email()]),
    telefone_comercial: schema.string({ trim: true }),
    cep: schema.string({ trim: true }),
    cidade: schema.string({ trim: true }),
    bairro: schema.string({ trim: true }),
    logradouro: schema.string({ trim: true }),
    numero: schema.string({ trim: true }),
    completo: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
    email: 'Email em formado invalido',
    unique: 'Já existe fornecedor com esse cpf ou cnpj',
  }
}
