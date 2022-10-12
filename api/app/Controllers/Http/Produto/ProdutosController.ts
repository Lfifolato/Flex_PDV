/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceProduto } from 'App/Services/Produto'
import CreateProdutoValidator from 'App/Validators/Produto/CreateProdutoValidator'
import UpdateProdutoValidator from 'App/Validators/Produto/UpdateProdutoValidator'

export default class ProdutosController {
  public async index({ response }: HttpContextContract) {
    const Service = ServiceProduto()
    const res = await Service.GetAll()
    if (res?.error == true) {
      return response.badRequest({ error: true, message: res.message })
    }
    return response.ok(res.data)
  }

  public async store({ request, response }: HttpContextContract) {
    const Service = ServiceProduto()
    const data = await request.validate(CreateProdutoValidator)

    const res = await Service.Create(data)

    if (res?.error == true) {
      return response.badRequest({ error: true, message: res.message })
    }
    return response.ok({ error: res?.error, message: res?.message })
  }

  public async show({ response, params }: HttpContextContract) {
    let id = params.id
    const Service = ServiceProduto()

    const res = await Service.Show(id)

    if (res?.error == true) {
      return response.badRequest({ error: res.error, message: res.message })
    }
    return response.ok(res?.data)
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const Service = ServiceProduto()
    const userLog = await auth.authenticate()

    let id = params.id

    const data = await request.validate(UpdateProdutoValidator)

    const res = await Service.Update(id, data, userLog.id)

    if (res?.error == true) {
      return response.badRequest({ error: res.error, message: res.message })
    }
    return response.ok(res)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const Service = ServiceProduto()
    let id = params.id

    const res = await Service.Delete(id)

    if (res?.error == true) {
      return response.badRequest({ error: res.error, message: res.message })
    }
    return response.ok({ error: res?.error, message: res?.message })
  }
}
