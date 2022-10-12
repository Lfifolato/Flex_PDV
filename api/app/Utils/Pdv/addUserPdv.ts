/* eslint-disable eqeqeq */
/**
 * @param  {number} userId
 * @param  {Number} pdvId
 */

import Pdv from 'App/Models/Pdv'

type RetornoDataType = {
  error: boolean
  message: string
}

export async function AddUserPdv(userId: number, pdvId: Number) {
  var retornoData: RetornoDataType

  try {
    const validPdv = await Pdv.findBy('id', pdvId)

    if (!validPdv) {
      retornoData = {
        message: 'Pdv não existe',
        error: false,
      }
      return retornoData
    } else if (validPdv.ativo == true) {
      retornoData = {
        message: `Pdv Ja esta Ativo com UserId ${validPdv.user_ativo}`,
        error: false,
      }
      return retornoData
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
