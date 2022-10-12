import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    nome: faker.internet.userName(),
    email: faker.internet.email(),
    cpf: faker.random.alphaNumeric(12),
    admin: true,
    password: faker.internet.password(),
  }
}).build()
