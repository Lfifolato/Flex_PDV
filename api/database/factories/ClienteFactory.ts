import Factory from '@ioc:Adonis/Lucid/Factory'
import Cliente from 'App/Models/Cliente'

export const ClienteFactory = Factory.define(Cliente, ({ faker }) => {
  return {
    nome: 'Cliente 1',
    cpf: faker.random.alphaNumeric(12).toString(),
    email: 'ciente@cliente.com',
    telefone: '19988787763',
    notificar: true,
    cep: faker.address.zipCode(),
    cidade: faker.address.cityName(),
    bairro: faker.address.county(),
    logradouro: faker.address.street(),
    numero: '309',
    ativo: true,
    ponto_vantagem: 0,
  }
}).build()
