/* eslint-disable eqeqeq */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import { AddUserPdv } from 'App/Utils/Pdv/addUserPdv'

export default class SessionsController {
  public async LoginAdmin({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()

    const user = await User.findBy('email', email)

    if (!user) {
      return response.badRequest({ error: 'Usuário não localizado' })
    }
    if (user.admin == false) {
      return response.badRequest({ error: 'Usuário não Permitido para acesso Admin' })
    }
    if (user.ativo == false) {
      return response.badRequest({ error: 'Usuário Inativo' })
    }

    const token = await auth.attempt(email, password, {
      expiresIn: '10 days',
    })

    user.rememberMeToken = token.token
    return response.ok(user)
  }
  //Refatorar quando tiver a tabela de PDV
  public async LoginPDV({ auth, request, response }: HttpContextContract) {
    const { email, password, nroPdv } = request.all()

    const user = await User.findBy('email', email)

    if (!user) {
      return response.badRequest({ Error: true, message: 'Usuário não localizado' })
    }

    if (user.ativo == false) {
      return response.badRequest({ Error: true, message: 'Usuário Inativo' })
    }

    const Pdv = await AddUserPdv(user.id, nroPdv)

    if (Pdv?.error == true) {
      return response.badRequest({ Error: true, message: Pdv.message })
    }
    const token = await auth.attempt(email, password, {
      expiresIn: '10 days',
    })

    user.rememberMeToken = token.token
    return response.ok(user)
  }

  public async Logout({ response, auth }: HttpContextContract) {
    try {
      auth.logout()
      return response.ok({ message: 'Usuário realizou logout com sucesso' })
    } catch (e) {
      return response.ok({ Error: true, message: 'Falha no logout' })
    }
  }

  public async Token({ auth, response }: HttpContextContract) {
    try {
      const validarToken = await auth.authenticate()
      return response.ok(validarToken)
    } catch (e) {
      return response.ok({ Error: true, message: 'Falha para validarToken' })
    }
  }
}
