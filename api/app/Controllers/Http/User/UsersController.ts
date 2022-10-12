/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import { ServiceUser } from 'App/Services/User'
import { geraLog } from 'App/Utils/Log/geraLog'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const Service = ServiceUser()
    const res = await Service.GetAll()
    if (res?.error == true) {
      return response.badRequest({ Error: true, message: res.message })
    }
    return response.ok(res?.data)
  }

  public async store({ request, response }: HttpContextContract) {
    const Service = ServiceUser()
    const data = await request.validate(CreateUserValidator)

    const res = await Service.Create(data)

    if (res.error == true) {
      return response.badRequest({ Error: true, message: res.message })
    }
    return response.ok({ Error: res.error, message: res.message })
  }

  public async show({ response, params }: HttpContextContract) {
    let id = params.id
    const Service = ServiceUser()

    const res = await Service.Show(id)

    if (res?.error == true) {
      return response.badRequest({ Error: res.error, message: res.message })
    }
    return response.ok(res?.data)
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const Service = ServiceUser()
    const userLog = await auth.authenticate()
    let id = params.id

    const data = await request.validate(UpdateUserValidator)

    const res = await Service.Update(id, data)

    if (res?.error == true) {
      return response.badRequest({ Error: res.error, message: res.message })
    }
    return response.ok(res)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const Service = ServiceUser()
    let id = params.id

    const res = await Service.Delete(id)

    if (res?.error == true) {
      return response.badRequest({ Error: res.error, message: res.message })
    }
    return response.ok(res)
  }
}
