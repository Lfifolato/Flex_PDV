/* eslint-disable eqeqeq */
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
      } else if (validFornecedor.ativo == false) {
        RetornoData = {
          error: true,
          message: 'Fornecedor Inativo',
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
  alterStatus: async (Id: number) => {
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

      if (produto.ativo == true) {
        produto.merge({ ativo: false })
        produto.save()
        RetornoData = {
          error: false,
          message: 'Status Alterado Produto Inativado com sucesso',
        }
        return RetornoData
      }

      if (produto.ativo == false) {
        produto.merge({ ativo: true })
        produto.save()
        RetornoData = {
          error: false,
          message: 'Status Alterado Produto Ativado com sucesso',
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
