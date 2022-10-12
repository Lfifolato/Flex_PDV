import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { GeraToken } from '../Utils/GeraToken'

test.group('Auth', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('[POST] LoginAdmin is valid ', async ({ client }) => {
    const response = await client.post('loginAdmin').json({
      email: 'test@example.com',
      password: '123',
    })
    const user = await User.findByOrFail('email', 'test@example.com')

    response.assertStatus(200)
    response.assertBodyContains({ id: user.id, nome: user.nome, cpf: user.cpf, email: user.email })
  })
  test('[POST] LoginAdmin email is invalid ', async ({ client }) => {
    const response = await client.post('loginAdmin').json({
      email: 'testt@example.com',
      password: '123',
    })

    response.assertStatus(400)
    response.assertBodyContains({ error: 'Usuário não localizado' })
  })
  test('[POST] LoginAdmin password is invalid ', async ({ client }) => {
    const response = await client.post('loginAdmin').json({
      email: 'test@example.com',
      password: '1234',
    })

    response.assertStatus(400)
    response.assertBodyContains({ errors: [] })
  })
  test('[POST] LoginPdv email is invalid ', async ({ client }) => {
    const response = await client.post('loginPDV').json({
      email: 'tes11t1@example.com',
      password: '123',
      nroPdv: 1,
    })

    response.assertStatus(400)
    response.assertBodyContains({ Error: true })
  })
  test('[GET] valid Token ', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get('token').bearerToken(data.token)
    response.assertStatus(200)
    response.assertBodyContains({
      id: data.user.id,
      nome: data.user.nome,
      cpf: data.user.cpf,
      email: data.user.email,
    })
  })

  test('[GET] invalid Token ', async ({ client }) => {
    const response = await client.get('token').bearerToken('NA.q24bg1FAdcQsOg2UWQSq43RBT3aQI89qaNM')
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[DELETE] valid Logout ', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.delete('logout').bearerToken(data.token)
    response.assertStatus(200)
    response.assertBodyContains({ message: 'Usuário realizou logout com sucesso' })
  })
})
