/* eslint-disable eqeqeq */
import Cliente from 'App/Models/Cliente'
import { geraLog } from 'App/Utils/Log/geraLog'
import { RetornoDataType } from '../Types/index'

export const ServiceCliente = () => ({
  GetAll: async () => {
    var RetornoData: RetornoDataType
    try {
      const allCliente = await Cliente.all()

      RetornoData = {
        error: false,
        data: allCliente,
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
      await Cliente.create(data)

      RetornoData = {
        error: false,
        message: 'Cliente criado com sucesso',
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
  Show: async (Id: number) => {
    var RetornoData: RetornoDataType
    try {
      const cliente = await Cliente.findBy('id', Id)

      if (!cliente) {
        RetornoData = {
          error: true,
          message: 'Cliente nāo localizado',
        }
        return RetornoData
      }

      RetornoData = {
        error: false,
        data: cliente,
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
  Update: async (Id: number, data: any, userLog: number) => {
    var RetornoData: RetornoDataType
    try {
      const cliente = await Cliente.findBy('id', Id)

      if (!cliente) {
        RetornoData = {
          error: true,
          message: 'Cliente nāo localizado',
        }
        return RetornoData
      }

      if (data.cpf != cliente.id) {
        const validCpf = await Cliente.findBy('cpf', data.cpf)

        if (cliente.cpf != validCpf?.cpf) {
          RetornoData = {
            error: true,
            message: 'cpf ja cadastrado para outro cliente',
          }
          return RetornoData
        }
      }
      await geraLog('cliente', Id, userLog, cliente)
      cliente.merge(data)

      await cliente.save()
      RetornoData = {
        error: false,
        message: 'Cliente Atualizado com sucesso',
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
  alterStatus: async (Id: number) => {
    var RetornoData: RetornoDataType
    try {
      const cliente = await Cliente.findBy('id', Id)

      if (!cliente) {
        RetornoData = {
          error: true,
          message: 'Cliente nāo localizado',
        }
        return RetornoData
      }

      if (cliente.ativo == true) {
        cliente.merge({ ativo: false })
        cliente.save()
        RetornoData = {
          error: false,
          message: 'Status Alterado cliente Inativado com sucesso',
        }
        return RetornoData
      }

      if (cliente.ativo == false) {
        cliente.merge({ ativo: true })
        cliente.save()
        RetornoData = {
          error: false,
          message: 'Status Alterado cliente Ativado com sucesso',
        }
        return RetornoData
      }
    } catch (error) {
      RetornoData = {
        error: true,
        message: error.message,
      }
      return RetornoData
    }
  },
})
