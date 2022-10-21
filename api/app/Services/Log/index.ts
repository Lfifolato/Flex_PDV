/* eslint-disable eqeqeq */
import { RetornoDataType } from '../Types/index'
import Database from '@ioc:Adonis/Lucid/Database'
import { table } from 'App/Utils/Log/table'
import Log from 'App/Models/Log'

// RetornoData = {
//   error: true,
//   message: error.message,
// }

export const ServiceLog = () => ({
  getLog: async (Model: string, id_ref: number) => {
    var RetornoData: RetornoDataType

    const filterModel = Model.toLowerCase()

    const filterTable: any = table.filter((e) => {
      if (e.model == filterModel) {
        return e.table[0].toLowerCase()
      }
    })

    try {
      const whereTable = filterTable[0].table

      const log = await Log.query().where('id_ref', id_ref).where('table_name', whereTable)

      if (log[0] == undefined) {
        RetornoData = {
          error: true,
          message: 'Id de Referencia não existe Log',
        }
        return RetornoData
      }

      RetornoData = {
        error: false,
        data: log,
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
