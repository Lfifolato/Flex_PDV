/* eslint-disable eqeqeq */

import MovEstoque from 'App/Models/MovEstoque'
import Produto from 'App/Models/Produto'

/**
 * @param  {number} idProduto  Identificador de Produto
 * @param  {string} tipo       Tipo de Movimentação E = Entrada S = Saida
 * @param  {number} quantidade Quantidade para movimentação
 */

export const GeraMovEstoque = async (idProduto: number, tipo: string, quantidade: number) => {
  const produto = await Produto.findByOrFail('id', idProduto)

  const dataMov = {
    id_Produto: idProduto,
    tipo: tipo,
    quantidade: quantidade,
  }
  const estoqueAtual = produto.qtd_estoque

  await MovEstoque.create(dataMov)

  if (tipo == 'E') {
    const novoEstoque = estoqueAtual + quantidade
    produto.merge({ qtd_estoque: novoEstoque })

    await produto.save()
  }

  if (tipo == 'S') {
    const novoEstoque = estoqueAtual - quantidade
    produto.merge({ qtd_estoque: novoEstoque })

    await produto.save()
  }
}
