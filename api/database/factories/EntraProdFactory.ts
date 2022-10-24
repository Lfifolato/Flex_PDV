import Factory from '@ioc:Adonis/Lucid/Factory'
import ProdEntrada from 'App/Models/ProdEntrada'

export const ProdEntradaFactory = Factory.define(ProdEntrada, ({ faker }) => {
  return {
    id_Produto: 1,
    ref_nf: false,
    qtd_entrada: 10,
  }
}).build()
