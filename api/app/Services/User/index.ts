/* eslint-disable eqeqeq */
import User from 'App/Models/User'
import { RetornoDataType } from '../Types/index'

export const ServiceUser = () => ({
  GetAll: async () => {
    var RetornoData: RetornoDataType
    try {
      const allUser = await User.query().orderBy('id', 'asc')

      RetornoData = {
        error: false,
        data: allUser,
      }

      return RetornoData
    } catch (error) {
      RetornoData = {
        error: true,
      }
      return RetornoData
    }
  },
  Create: async (data: any) => {
    var RetornoData: RetornoDataType
    try {
      await User.create(data)
      RetornoData = {
        error: false,
        message: 'Usuário criado com sucesso',
      }

      return RetornoData
    } catch (error) {
      RetornoData = {
        error: true,
        message: error.message,
      }
      return RetornoData
    }
  },
  Show: async (UserId: number) => {
    var RetornoData: RetornoDataType
    try {
      const user = await User.findBy('id', UserId)

      if (!user) {
        RetornoData = {
          error: true,
          message: 'Usuários Nao Localizado',
        }

        return RetornoData
      }
      RetornoData = {
        error: false,
        data: user,
      }

      return RetornoData
    } catch (error) {
      RetornoData = {
        error: true,
        message: error.message,
      }
      return RetornoData
    }
  },
  Update: async (UserId: number, data: any) => {
    var RetornoData: RetornoDataType
    try {
      const user = await User.findBy('id', UserId)
      if (!user) {
        RetornoData = {
          error: true,
          message: 'Usuários Nao Localizado',
        }
        return RetornoData
      }

      const validEmail = await User.findBy('email', data.email)

      if (validEmail?.id != user.id) {
        if (validEmail) {
          RetornoData = {
            error: true,
            message: 'E-mail ja cadastrado',
          }
          return RetornoData
        }
      }

      const validCpf = await User.findBy('cpf', data.cpf)
      if (validCpf?.id != user.id) {
        if (validCpf) {
          RetornoData = {
            error: true,
            message: 'CPF ja cadastrado',
          }
          return RetornoData
        }
      }

      user.merge(data)

      await user.save()

      RetornoData = {
        error: false,
        message: 'Usuário Atualizado com sucesso',
      }

      return RetornoData
    } catch (error) {
      RetornoData = {
        error: true,
        message: error.message,
      }
      return RetornoData
    }
  },
  Delete: async (userId: number) => {
    var RetornoData: RetornoDataType
    try {
      const user = await User.findBy('id', userId)

      if (!user) {
        RetornoData = {
          error: true,
          message: 'Usuários Nao Localizado',
        }
        return RetornoData
      }

      await user.delete()

      RetornoData = {
        error: false,
        message: 'Usuário Deletado com sucesso',
      }
      return RetornoData
    } catch (error) {
      RetornoData = {
        error: true,
        message: error.message,
      }
      return RetornoData
    }
  },
})
