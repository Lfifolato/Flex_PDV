import Fornecedor from 'App/Models/Fornecedor'
import Produto from 'App/Models/Produto'
import { geraLog } from 'App/Utils/Log/geraLog'
import { RetornoDataType } from '../Types/index'

export const ServiceProduto = () => ({
  GetAll: async () => {
    var RetornoData: RetornoDataType
    try {
      const allProduto = await Produto.all()

      RetornoData = {
        error: false,
        data: allProduto,
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
      const validFornecedor = await Fornecedor.findBy('id', data.id_fornecedor)

      if (!validFornecedor) {
        RetornoData = {
          error: true,
          message: 'Fornecedor não localizado',
        }
        return RetornoData
      }

      await Produto.create(data)

      RetornoData = {
        error: false,
        message: 'Produto criado com sucesso',
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
      const produto = await Produto.findBy('id', Id)

      if (!produto) {
        RetornoData = {
          error: true,
          message: 'Produto não localizado',
        }
        return RetornoData
      }
      RetornoData = {
        error: false,
        data: produto,
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
      const produto = await Produto.findBy('id', Id)

      if (!produto) {
        RetornoData = {
          error: true,
          message: 'Produto não localizado',
        }
        return RetornoData
      }

      if (data.id_fornecedor) {
        const validFornecedor = await Fornecedor.findBy('id', data.id_fornecedor)

        if (!validFornecedor) {
          RetornoData = {
            error: true,
            message: 'Fornecedor não localizado',
          }
          return RetornoData
        }
      }

      await geraLog('produto', Id, userLog, produto)

      produto.merge(data)

      await produto.save()

      RetornoData = {
        error: false,
        message: 'Produto atualizado com sucesso',
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
  Delete: async (Id: number) => {
    var RetornoData: RetornoDataType
    try {
      const produto = await Produto.findBy('id', Id)

      if (!produto) {
        RetornoData = {
          error: true,
          message: 'Produto não localizado',
        }
        return RetornoData
      }

      await produto.delete()

      RetornoData = {
        error: false,
        message: 'Produto deletado com sucesso',
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
