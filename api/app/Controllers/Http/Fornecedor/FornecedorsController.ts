/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceFornecedor } from 'App/Services/Fornecedor'
import CreateFornecedorValidator from 'App/Validators/Fornecedor/CreateFornecedorValidator'
import UpdateFornecedorValidator from 'App/Validators/Fornecedor/UpdateFornecedorValidator'

export default class FornecedorsController {
  public async index({ response }: HttpContextContract) {
    const Service = ServiceFornecedor()
    const res = await Service.GetAll()
    if (res?.error == true) {
      return response.badRequest({ Error: true, message: res.message })
    }
    return response.ok(res.data)
  }

  public async store({ request, response }: HttpContextContract) {
    const Service = ServiceFornecedor()
    const data = await request.validate(CreateFornecedorValidator)

    const res = await Service.Create(data)

    if (res?.error == true) {
      return response.badRequest({ Error: true, message: res.message })
    }
    return response.ok({ error: res?.error, message: res?.message })
  }

  public async show({ response, params }: HttpContextContract) {
    let id = params.id
    const Service = ServiceFornecedor()

    const res = await Service.Show(id)

    if (res?.error == true) {
      return response.badRequest({ Error: res.error, message: res.message })
    }
    return response.ok(res?.data)
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const Service = ServiceFornecedor()
    const userLog = await auth.authenticate()

    let id = params.id

    const data = await request.validate(UpdateFornecedorValidator)

    const res = await Service.Update(id, data, userLog.id)

    if (res?.error == true) {
      return response.badRequest({ Error: res.error, message: res.message })
    }
    return response.ok(res)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const Service = ServiceFornecedor()
    let id = params.id

    const res = await Service.alterStatus(id)

    if (res?.error == true) {
      return response.badRequest({ Error: res.error, message: res.message })
    }
    return response.ok(res)
  }
}
