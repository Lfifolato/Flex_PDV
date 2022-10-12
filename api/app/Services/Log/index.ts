/* eslint-disable eqeqeq */
import { RetornoDataType } from '../Types/index'
import Database from '@ioc:Adonis/Lucid/Database'

// RetornoData = {
//   error: true,
//   message: error.message,
// }

export const ServiceLog = () => ({
  getLog: async (table: string, id_ref: number) => {
    var RetornoData: RetornoDataType
    try {
      const formatTable = table.toLowerCase()
      const whereTable = `"${formatTable}"`

      const log = await Database.rawQuery(
        `select * from logs l
          where 1=1
          and l.id_ref = ${id_ref}
          and l.table_name = ${whereTable}
         `
      )

      if (log[0][0] == undefined) {
        RetornoData = {
          error: true,
          message: 'Id de Referencia não existe Log',
        }
        return RetornoData
      }

      RetornoData = {
        error: false,
        data: log[0],
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
