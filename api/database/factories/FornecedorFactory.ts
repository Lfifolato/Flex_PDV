import Factory from '@ioc:Adonis/Lucid/Factory'
import Fornecedor from 'App/Models/Fornecedor'

export const FornecedorFactory = Factory.define(Fornecedor, ({ faker }) => {
  return {
    nome: faker.internet.userName(),
    descricao: faker.commerce.productDescription(),
    email_comercial: faker.internet.email(),
    telefone_comercial: faker.phone.number(),
    tipo: 'Jurídica',
    cpf_cnpj: faker.random.alphaNumeric(12),
    cep: faker.address.zipCode(),
    cidade: faker.address.cityName(),
    bairro: faker.address.county(),
    logradouro: faker.address.street(),
    completo: 'test',
  }
}).build()
