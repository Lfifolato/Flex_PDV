/* eslint-disable eqeqeq */
import Cliente from 'App/Models/Cliente'
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
      const filterCliente = await Cliente.findBy('id', Id)

      if (!filterCliente) {
        RetornoData = {
          error: true,
          message: 'Cliente nāo localizado',
        }
        return RetornoData
      }

      RetornoData = {
        error: false,
        data: filterCliente,
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
  Update: async (Id: number, data: any) => {
    var RetornoData: RetornoDataType
    try {
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
      const filterCliente = await Cliente.findBy('id', Id)

      if (!filterCliente) {
        RetornoData = {
          error: true,
          message: 'Cliente nāo localizado',
        }
        return RetornoData
      }

      if (filterCliente.ativo == true) {
        filterCliente.merge({ ativo: false })
        filterCliente.save()
        RetornoData = {
          error: false,
          message: 'Status Alterado cliente Inativado com sucesso',
        }
        return RetornoData
      }

      if (filterCliente.ativo == false) {
        filterCliente.merge({ ativo: true })
        filterCliente.save()
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
