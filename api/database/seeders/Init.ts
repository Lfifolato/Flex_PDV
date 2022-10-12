import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { FornecedorFactory } from 'Database/factories/FornecedorFactory'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      nome: 'Primeiro User',
      cpf: '14090400',
      email: 'test@example.com',
      admin: true,
      password: '123',
    })
  }
}
