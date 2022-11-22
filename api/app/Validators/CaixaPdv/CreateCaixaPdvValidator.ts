import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCaixaPdvValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id_operador: schema.number(),
    id_pdv: schema.number(),
    salto_inicial: schema.number(),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
  }
}
