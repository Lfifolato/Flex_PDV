/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceLog } from 'App/Services/Log'

export default class LogsController {
  public async index({ response, params }: HttpContextContract) {
    const service = ServiceLog()
    let id = params.id
    let table = params.table

    const res = await service.getLog(table, id)

    if (res?.error == true) {
      return response.badRequest({ Error: res.error, message: res.message })
    }
    return response.ok(res?.data)
  }
}
