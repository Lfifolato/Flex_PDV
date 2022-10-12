import Factory from '@ioc:Adonis/Lucid/Factory'
import Produto from 'App/Models/Produto'

export const ProdutoFactory = Factory.define(Produto, ({ faker }) => {
  return {
    nome: faker.commerce.productName(),
    bar_cod: faker.random.numeric(14),
    descricao: faker.commerce.productDescription(),
    vlr_custo: 10,
    per_lucro: 20,
    id_fornecedor: 1,
  }
}).build()
