/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceProdEntrada } from 'App/Services/ProdEntrada'
import CreateProdEntradaValidator from 'App/Validators/ProdEntrada/CreateProdEntradaValidator'

export default class ProdEntradasController {
  public async index({ response }: HttpContextContract) {
    const Service = ServiceProdEntrada()
    const res = await Service.GetAll()
    if (res?.error == true) {
      return response.badRequest({ error: true, message: res.message })
    }
    return response.ok(res.data)
  }

  public async store({ request, response }: HttpContextContract) {
    const Service = ServiceProdEntrada()
    const data = await request.validate(CreateProdEntradaValidator)

    const res = await Service.Create(data)

    if (res?.error == true) {
      return response.badRequest({ error: true, message: res.message })
    }
    return response.ok({ error: res?.error, message: res?.message })
  }
}
