/* eslint-disable eqeqeq */

import Log from 'App/Models/Log'
import { table } from './table'

/**
 * @param  {string} model       Table de alteração
 * @param  {number} id_ref      id alterado
 * @param  {number} user_alter  user de alteração
 * @param  {object} data        table antes do Update
 */
export const geraLog = async (model: string, id_ref: number, user_alter: number, data: any) => {
  try {
    const filterTable: any = table.filter((e) => {
      if (e.model == model) {
        return e.table[0]
      }
    })

    const dataLog = {
      table_name: filterTable[0].table,
      id_ref: id_ref,
      user_alter: user_alter,
      log: data.$attributes,
    }

    await Log.create(dataLog)
  } catch (e) {
    return { error: 'algum erro ao gerar log' }
  }
}
