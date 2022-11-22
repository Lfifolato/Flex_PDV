/* eslint-disable eqeqeq */

import Pdv from 'App/Models/Pdv'
import { ServiceCaixaPdv } from 'App/Services/CaixaPdv'
import { RetornoDataType } from 'app/Services/Types/index'

/**
 * @param  {number} userId
 * @param  {Number} pdvId
 */

export async function AddUserPdv(userId: number, pdvId: number) {
  var retornoData: RetornoDataType
  const service = ServiceCaixaPdv()
  try {
    const validPdv = await Pdv.findBy('id', pdvId)
    const validCaixa = await service.validCaixaAberto(pdvId, userId)

    if (validCaixa.error == true) {
      retornoData = {
        message: validCaixa.message,
        error: true,
      }
      return retornoData
    }
    if (!validPdv) {
      retornoData = {
        message: 'Pdv não existe',
        error: false,
      }
      return retornoData
    } else if (validPdv.ativo == true) {
      if (validPdv.user_ativo != userId) {
        retornoData = {
          message: `Pdv Ja esta Ativo com UserId ${validPdv.user_ativo}`,
          error: false,
        }
        return retornoData
      }
    } else {
      validPdv.merge({ user_ativo: userId, ativo: true })
      await validPdv.save()
      retornoData = {
        message: `Usuário atribuído ao Pdv com sucesso`,
        error: true,
      }
      return retornoData
    }
  } catch (error) {
    retornoData = {
      message: 'Error',
      error: false,
    }
    return retornoData
  }
}
