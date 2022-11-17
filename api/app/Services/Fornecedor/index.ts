/* eslint-disable eqeqeq */
import Fornecedor from 'App/Models/Fornecedor'
import { geraLog } from 'App/Utils/Log/geraLog'
import { RetornoDataType } from '../Types/index'

export const ServiceFornecedor = () => ({
  GetAll: async () => {
    var RetornoData: RetornoDataType
    try {
      const allFornecedor = await Fornecedor.all()

      RetornoData = {
        error: false,
        data: allFornecedor,
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
      await Fornecedor.create(data)

      RetornoData = {
        error: false,
        message: 'Fornecedor Criado com sucesso',
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
      const fornecedor = await Fornecedor.findBy('id', Id)

      if (!fornecedor) {
        RetornoData = {
          error: true,
          message: 'Fornecedor não localizado',
        }

        return RetornoData
      }
      await fornecedor.load('Produtos')
      RetornoData = {
        error: false,
        data: fornecedor,
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
  Update: async (Id: number, data: any, userLog) => {
    var RetornoData: RetornoDataType
    try {
      const fornecedor = await Fornecedor.findBy('id', Id)

      if (!fornecedor) {
        RetornoData = {
          error: true,
          message: 'Fornecedor não localizado',
        }

        return RetornoData
      }

      const validCpfCnpj = await Fornecedor.findBy('cpf_cnpj', data.cpf_cnpj)

      if (validCpfCnpj?.id != fornecedor.id) {
        if (validCpfCnpj) {
          RetornoData = {
            error: true,
            message: 'CPF ou CNPJ ja cadastrado para outro fornecedor',
          }
          return RetornoData
        }
      }

      await geraLog('fornecedor', Id, userLog, fornecedor)

      fornecedor.merge(data)

      await fornecedor.save()

      RetornoData = {
        error: false,
        message: 'Fornecedor Atualizado com sucesso',
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
      const fornecedor = await Fornecedor.findBy('id', Id)

      if (!fornecedor) {
        RetornoData = {
          error: true,
          message: 'Fornecedor não localizado',
        }

        return RetornoData
      }

      if (fornecedor.ativo == true) {
        fornecedor.merge({ ativo: false })
        fornecedor.save()
        RetornoData = {
          error: false,
          message: 'Status Alterado Fornecedor Inativado com sucesso',
        }
        return RetornoData
      }

      if (fornecedor.ativo == false) {
        fornecedor.merge({ ativo: true })
        fornecedor.save()
        RetornoData = {
          error: false,
          message: 'Status Alterado Fornecedor Ativado com sucesso',
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
