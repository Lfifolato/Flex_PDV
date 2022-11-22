/* eslint-disable eqeqeq */
import CaixaPdv from 'App/Models/CaixaPdv'
import moment from 'moment'
import { RetornoDataType } from '../Types/index'

export const ServiceCaixaPdv = () => ({
  validCaixaAberto: async (id_pdv: number) => {
    var RetornoData: RetornoDataType
    try {
      const data = await CaixaPdv.query().where('id_pdv', id_pdv).andWhere('ativo', true)

      if (data.length == 0) {
        RetornoData = {
          error: false,
        }
        return RetornoData
      }

      RetornoData = {
        error: true,
        message: `Caixa do Pdv: ${data[0].id_pdv} Esta em aberto na Data ${data[0].data_create}`,
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

  GetAll: async () => {
    var RetornoData: RetornoDataType
    try {
      const data = await CaixaPdv.query().preload('User')

      RetornoData = {
        error: false,
        data: data,
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
      const dataCreate = {
        id_operador: data.id_operador,
        id_pdv: data.id_pdv,
        salto_inicial: data.salto_inicial,
        salto_atual: data.salto_inicial,
        data_create: moment().format('l'),
      }

      await CaixaPdv.create(dataCreate)
    } catch (error) {
      RetornoData = {
        error: true,
        message: error.message,
      }
      return RetornoData
    }
  },

  Delete: async (Id: number, id_user: number) => {
    var RetornoData: RetornoDataType
    try {
      const caixa = await CaixaPdv.findBy('id', Id)

      if (!caixa) {
        RetornoData = {
          error: true,
          message: 'Caixa não localizado',
        }

        return RetornoData
      }

      caixa.merge({ ativo: false, id_user: id_user })

      await caixa.save()

      RetornoData = {
        error: false,
        message: 'Caixa Fechado com sucesso',
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
