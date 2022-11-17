import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Log from 'App/Models/Log'
import { ClienteFactory } from 'Database/factories/ClienteFactory'
import { GeraToken } from '../Utils/GeraToken'

test.group('Cliente', (group) => {
  group.each.setup(async () => {
    await Database.rawQuery('DELETE FROM tb_cliente ')
    return Database.rawQuery('DELETE FROM tb_cliente ')
  })
  group.teardown(async () => {
    await Database.rawQuery('DELETE FROM tb_cliente ')
    return Database.rawQuery('DELETE FROM tb_cliente ')
  })

  test('[GET] Cliente All invalid Token', async ({ client }) => {
    const response = await client.get('cliente').bearerToken('xxxxxxx')
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] Cliente All', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get('cliente').bearerToken(data.token)
    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[POST] Cliente Create invalid Token', async ({ client }) => {
    const response = await client.post('cliente').bearerToken('xxxxx').json({
      nome: 'Cliente 01',
      cpf: '4391233421',
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] Cliete Create validation field cpf unique', async ({ client }) => {
    await ClienteFactory.merge({ cpf: '14090400' }).create()

    const data = await GeraToken()
    const response = await client.post('fornecedor').bearerToken(data.token).json({
      nome: 'Cliente 01',
      cpf: '14090400',
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })
    response.assertStatus(422)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] User Create success', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.post('cliente').bearerToken(data.token).json({
      nome: 'Cliente 01',
      cpf: '4391233455',
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })
    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Cliente criado com sucesso' })
  })

  test('[GET] Cliente Show invalid token', async ({ client }) => {
    const response = await client.get(`cliente/${1}`).bearerToken('xxxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] Cliente to not found', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.get(`cliente/${99}`).bearerToken(data.token)

    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Cliente nāo localizado' })
  })

  test('[GET] Cliente success', async ({ client }) => {
    const cliente = await ClienteFactory.create()
    const data = await GeraToken()
    const response = await client.get(`cliente/${cliente.id}`).bearerToken(data.token)

    response.assertStatus(200)
    response.assertBodyContains({})
  })

  test('[PUT] Cliente Update invalid token', async ({ client }) => {
    const cliente = await ClienteFactory.merge({ cpf: '1020304051' }).create()

    const response = await client.get(`cliente/${cliente.id}`).bearerToken('xxxx').json({
      nome: 'Cliente 01',
      cpf: '1020304051',
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[PUT] Cliente Update to not found', async ({ client }) => {
    const data = await GeraToken()
    const cliente = await ClienteFactory.merge({ cpf: '1020304051' }).create()

    const response = await client.get(`cliente/${99}`).bearerToken(data.token).json({
      nome: 'Cliente 01',
      cpf: '1020304051',
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })

    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Cliente nāo localizado' })
  })

  test('[PUT] cliente Update cpf exist', async ({ client }) => {
    const cliente = await ClienteFactory.create()
    const cliente1 = await ClienteFactory.merge({ cpf: '10203052' }).create()
    const data = await GeraToken()
    const response = await client.put(`cliente/${cliente.id}`).bearerToken(data.token).json({
      nome: 'Cliente 01',
      cpf: cliente1.cpf,
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })

    response.assertStatus(400)
    response.assertBodyContains({
      error: true,
      message: 'cpf ja cadastrado para outro cliente',
    })
  })

  test('[PUT] cliente Update success', async ({ client }) => {
    const cliente = await ClienteFactory.create()
    const data = await GeraToken()
    const response = await client.put(`cliente/${cliente.id}`).bearerToken(data.token).json({
      nome: 'Cliente 01',
      cpf: cliente.cpf,
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      error: false,
      message: 'Cliente Atualizado com sucesso',
    })
  })

  test('[PUT] Cliente Update success Log create', async ({ client, assert }) => {
    const cliente = await ClienteFactory.create()
    const data = await GeraToken()
    const response = await client.put(`cliente/${cliente.id}`).bearerToken(data.token).json({
      nome: 'Cliente 01',
      cpf: cliente.cpf,
      email: 'cliente@teste.com',
      telefone: '16988768787',
      notificar: 0,
      cep: '14090400',
      cidade: 'Ribeirao preto',
      bairro: 'Sao luiz',
      logradouro: 'rua',
      numero: '1',
      ponto_vantagem: 0,
      ativo: 1,
    })
    const validLog = await Log.query().where('id_ref', cliente.id).where('table_name', 'tb_cliente')

    assert.notEmpty(validLog)
    response.assertStatus(200)
    response.assertBodyContains({
      error: false,
      message: 'Cliente Atualizado com sucesso',
    })
  })

  test('[DELETE] cliente invalid token', async ({ client }) => {
    const cliente = await ClienteFactory.create()
    const response = await client.delete(`fornecedor/${cliente.id}`).bearerToken('xxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[DELETE] Cliente to not found', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.delete(`cliente/${99}`).bearerToken(data.token)

    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Cliente nāo localizado' })
  })

  test('[DELETE] Cliente success', async ({ client }) => {
    const cliente = await ClienteFactory.create()
    const data = await GeraToken()
    const response = await client.delete(`cliente/${cliente.id}`).bearerToken(data.token)

    response.assertStatus(200)
    response.assertBodyContains({
      error: false,
      message: 'Status Alterado cliente Inativado com sucesso',
    })
  })
})
