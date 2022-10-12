import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pdv from 'App/Models/Pdv'

export default class PdvsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Pdv.all()

      return response.ok(data)
    } catch (e) {
      return response.badRequest({ Error: true, message: e.message })
    }
  }

  public async store({ response }: HttpContextContract) {
    const pdv = await Pdv.create({})

    pdv.merge({ nome: `PDV ${pdv.id}` })

    await pdv.save()

    return response.ok({ Error: false, message: 'PDV criado com sucesso' })
  }
}
