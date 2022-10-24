import ProdEntrada from 'App/Models/ProdEntrada'
import Produto from 'App/Models/Produto'
import { GeraMovEstoque } from 'App/Utils/MovEstoque/GeraMovEstoque'
import { RetornoDataType } from '../Types/index'

export const ServiceProdEntrada = () => ({
  GetAll: async () => {
    var RetornoData: RetornoDataType

    try {
      const allProdEntrada = await ProdEntrada.all()

      RetornoData = {
        error: false,
        data: allProdEntrada,
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
      const validProduto = await Produto.findBy('id', data.id_produto)

      if (!validProduto) {
        RetornoData = {
          error: true,
          message: 'Produto não localizado',
        }
        return RetornoData
      }

      await ProdEntrada.create(data)

      await GeraMovEstoque(data.id_produto, 'E', data.qtd_entrada)

      RetornoData = {
        error: false,
        message: 'Entrada criada com sucesso',
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
