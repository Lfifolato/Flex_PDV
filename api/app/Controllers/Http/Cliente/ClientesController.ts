/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceCliente } from 'App/Services/Cliente'
import CreateClienteValidator from 'App/Validators/Cliente/CreateClienteValidator'
import UpdateClienteValidator from 'App/Validators/Cliente/UpdateClienteValidator'

export default class ClientesController {
  public async index({ response }: HttpContextContract) {
    const Service = ServiceCliente()
    const res = await Service.GetAll()
    if (res?.error == true) {
      return response.badRequest({ error: true, message: res.message })
    }
    return response.ok(res.data)
  }

  public async store({ request, response }: HttpContextContract) {
    const Service = ServiceCliente()
    const data = await request.validate(CreateClienteValidator)

    const res = await Service.Create(data)

    if (res?.error == true) {
      return response.badRequest({ error: true, message: res.message })
    }
    return response.ok({ error: res?.error, message: res?.message })
  }

  public async show({ response, params }: HttpContextContract) {
    let id = params.id
    const Service = ServiceCliente()

    const res = await Service.Show(id)

    if (res?.error == true) {
      return response.badRequest({ error: res.error, message: res.message })
    }
    return response.ok(res?.data)
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const Service = ServiceCliente()
    const userLog = await auth.authenticate()
    let id = params.id

    const data = await request.validate(UpdateClienteValidator)

    const res = await Service.Update(id, data, userLog.id)

    if (res?.error == true) {
      return response.badRequest({ error: res.error, message: res.message })
    }
    return response.ok(res)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const Service = ServiceCliente()
    let id = params.id

    const res = await Service.alterStatus(id)

    if (res?.error == true) {
      return response.badRequest({ error: res.error, message: res.message })
    }
    return response.ok({ error: res?.error, message: res?.message })
  }
}
