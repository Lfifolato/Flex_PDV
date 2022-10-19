import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories/UserFactory'

import { GeraToken } from '../Utils/GeraToken'

test.group('User', (group) => {
  group.each.setup(async () => {
    await Database.rawQuery('DELETE FROM tb_user ')
    return Database.rawQuery('DELETE FROM tb_user ')
  })
  group.teardown(async () => {
    await Database.rawQuery('DELETE FROM tb_user ')
    return Database.rawQuery('DELETE FROM tb_user ')
  })

  test('[GET] User All invalid Token', async ({ client }) => {
    const response = await client.get('user').bearerToken('xxxxxxx')
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] User All', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get('user').bearerToken(data.token)
    response.assertStatus(200)
    response.assertBodyContains([{}])
  })

  test('[POST] User Create invalid Token', async ({ client }) => {
    const response = await client.post('user').bearerToken('xxxxxxx').json({
      nome: 'User Test',
      cpf: '14090400',
      email: 'user@example.com',
      admin: true,
      password: '123',
    })
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] User Create validation field Email', async ({ client }) => {
    const user = await UserFactory.merge({ email: 'user@example.com' }).create()

    const data = await GeraToken()
    const response = await client.post('user').bearerToken(data.token).json({
      nome: 'User Test',
      cpf: '140904001',
      email: user.email,
      admin: true,
      password: '123',
    })
    response.assertStatus(422)
    response.assertBodyContains({ errors: [] })
  })
  test('[POST] User Create validation field cpf', async ({ client }) => {
    const user = await UserFactory.merge({ cpf: '14090450' }).create()

    const data = await GeraToken()
    const response = await client.post('user').bearerToken(data.token).json({
      nome: 'User Test',
      cpf: user.cpf,
      email: 'userr@example.com',
      admin: true,
      password: '123',
    })
    response.assertStatus(422)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] User Create Success', async ({ client, assert }) => {
    const data = await GeraToken()

    const dataUser = {
      nome: 'User Test',
      cpf: '14090400',
      email: 'userr@example.com',
      admin: true,
      password: '123',
    }

    const response = await client.post('user').bearerToken(data.token).json(dataUser)

    const validUser = await User.findByOrFail('cpf', dataUser.cpf)

    response.assertStatus(200)
    response.assertBodyContains({ Error: false, message: 'Usuário criado com sucesso' })

    assert.include(
      { name: dataUser.email, cpf: dataUser.cpf, email: dataUser.email },
      { name: validUser.email, cpf: validUser.cpf, email: validUser.email }
    )
  })

  test('[PUT] User Update  invalid Token', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.put(`user/${user.id}`).bearerToken('xxxxxx').json({
      nome: 'User Test',
      cpf: '14090400',
      email: 'userr@example.com',
      admin: true,
      password: '123',
    })

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[PUT] User to not found', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.put(`user/${50}`).bearerToken(data.token).json({
      nome: 'User Test',
      cpf: '14090400',
      email: 'userr@example.com',
      admin: true,
      password: '123',
    })

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'Usuários Nao Localizado' })
  })
  test('[PUT] User E-mail already registered', async ({ client }) => {
    const data = await GeraToken()
    const user = await UserFactory.create()
    const valid = await UserFactory.create()
    const response = await client.put(`user/${user.id}`).bearerToken(data.token).json({
      nome: 'User Test',
      cpf: '14090400',
      email: valid.email,
      admin: true,
      password: '123',
    })

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'E-mail ja cadastrado' })
  })
  test('[PUT] User CPF already registered', async ({ client }) => {
    const data = await GeraToken()
    const user = await UserFactory.create()
    const valid = await UserFactory.create()
    const response = await client.put(`user/${user.id}`).bearerToken(data.token).json({
      nome: 'User Test',
      cpf: valid.cpf,
      email: 'userr@example.com',
      admin: true,
      password: '123',
    })

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'CPF ja cadastrado' })
  })
  test('[PUT] User Update Success', async ({ client }) => {
    const data = await GeraToken()
    const user = await UserFactory.create()
    const response = await client.put(`user/${user.id}`).bearerToken(data.token).json({
      nome: user.nome,
      cpf: user.cpf,
      email: user.email,
      admin: false,
      password: '12355',
    })

    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Usuário Atualizado com sucesso' })
  })

  test('[GET] User Show invalid token', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get(`user/${user.id}`).bearerToken('xxxxxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] User Show to not found', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get(`user/${50}`).bearerToken(data.token)

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'Usuários Nao Localizado' })
  })
  test('[GET] User Show Success', async ({ client }) => {
    const data = await GeraToken()
    const user = await UserFactory.create()
    const response = await client.get(`user/${user.id}`).bearerToken(data.token)

    response.assertStatus(200)
    response.assertBodyContains({ id: user.id, nome: user.nome, cpf: user.cpf, email: user.email })
  })
  test('[DELETE] User Delete invalid token', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.delete(`user/${user.id}`).bearerToken('xxxxxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })
  test('[DELETE] User Delete to not found', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get(`user/${9999}`).bearerToken(data.token)

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'Usuários Nao Localizado' })
  })
  test('[DELETE] User Delete Success', async ({ client, assert }) => {
    const data = await GeraToken()
    const user = await UserFactory.create()
    const response = await client.delete(`user/${user.id}`).bearerToken(data.token)

    const userValid = await User.findBy('id', user.id)

    if (!userValid) {
      assert.isNotFalse(undefined)
    }

    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Usuário Deletado com sucesso' })
  })
})
