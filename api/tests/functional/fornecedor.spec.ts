/* eslint-disable eqeqeq */
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { GeraToken } from '../Utils/GeraToken'
import { FornecedorFactory } from 'Database/factories/FornecedorFactory'
import Log from 'App/Models/Log'

test.group('Fornecedor', (group) => {
  group.each.setup(async () => {
    await Database.rawQuery('DELETE FROM fornecedors ')
    return Database.rawQuery('DELETE FROM fornecedors ')
  })
  group.teardown(async () => {
    await Database.rawQuery('DELETE FROM fornecedors ')
    return Database.rawQuery('DELETE FROM fornecedors ')
  })

  test('[GET] Fornecedor All invalid Token', async ({ client }) => {
    const response = await client.get('fornecedor').bearerToken('xxxxxxx')
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] Fornecedor All', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get('user').bearerToken(data.token)
    response.assertStatus(200)
    response.assertBodyContains([{}])
  })

  test('[POST] Fornecedor Create invalid Token', async ({ client }) => {
    const response = await client.post('fornecedor').bearerToken('xxxxx').json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'juridica',
      cpf_cnpj: '2322456545332456',
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] User Create validation field Email', async ({ client }) => {
    await FornecedorFactory.merge({ cpf_cnpj: '14090400' }).create()

    const data = await GeraToken()
    const response = await client.post('user').bearerToken(data.token).json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'juridica',
      cpf_cnpj: '14090400',
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })
    response.assertStatus(422)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] User Create success', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.post('fornecedor').bearerToken(data.token).json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'juridica',
      cpf_cnpj: '23456432',
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })

    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Fornecedor Criado com sucesso' })
  })

  test('[GET] Fornecedor Show invalid token', async ({ client }) => {
    const response = await client.get(`fornecedor/${1}`).bearerToken('xxxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] Fornecedor to not found', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.get(`fornecedor/${1}`).bearerToken(data.token)

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'Fornecedor não localizado' })
  })

  test('[GET] Fornecedor success', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const data = await GeraToken()
    const response = await client.get(`fornecedor/${fornecedor.id}`).bearerToken(data.token)

    response.assertStatus(200)
    response.assertBodyContains({})
  })

  test('[PUT] Fornecedor Update invalid token', async ({ client }) => {
    const fornecedor = await FornecedorFactory.merge({ cpf_cnpj: '1020304050' }).create()

    const response = await client.get(`fornecedor/${fornecedor.id}`).bearerToken('xxxx').json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'juridica',
      cpf_cnpj: '1020304050',
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[PUT] Fornecedor Update to not found', async ({ client }) => {
    await FornecedorFactory.create()
    const data = await GeraToken()
    const response = await client.get(`fornecedor/${50}`).bearerToken(data.token).json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'juridica',
      cpf_cnpj: '1020304050',
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'Fornecedor não localizado' })
  })

  test('[PUT] Fornecedor Update cpf_cnpj exist', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const fornecedor1 = await FornecedorFactory.merge({ cpf_cnpj: '10203040' }).create()
    const data = await GeraToken()
    const response = await client.put(`fornecedor/${fornecedor.id}`).bearerToken(data.token).json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'juridica',
      cpf_cnpj: fornecedor1.cpf_cnpj,
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })

    response.assertStatus(400)
    response.assertBodyContains({
      Error: true,
      message: 'CPF ou CNPJ ja cadastrado para outro fornecedor',
    })
  })

  test('[PUT] Fornecedor Update success', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const data = await GeraToken()
    const response = await client.put(`fornecedor/${fornecedor.id}`).bearerToken(data.token).json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'Física',
      cpf_cnpj: fornecedor.cpf_cnpj,
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      error: false,
      message: 'Fornecedor Atualizado com sucesso',
    })
  })
  test('[PUT] Fornecedor Update success Log create', async ({ client, assert }) => {
    const fornecedor = await FornecedorFactory.create()
    const data = await GeraToken()
    const response = await client.put(`fornecedor/${fornecedor.id}`).bearerToken(data.token).json({
      nome: 'Test Fonrecedor',
      descricao: 'Testt',
      tipo: 'Física',
      cpf_cnpj: fornecedor.cpf_cnpj,
      email_comercial: 'test@gmail.com',
      telefone_comercial: '169988534868',
      cep: '14090400',
      cidade: 'Ribeirão Preto',
      bairro: 'Parque dos Bandeirantes',
      logradouro: 'Rua Ângelo Belloni',
      numero: '309',
      completo: '',
    })
    const validLog = await Log.query()
      .where('id_ref', fornecedor.id)
      .where('table_name', 'fornecedors')
    assert.notEmpty(validLog)
    response.assertStatus(200)
    response.assertBodyContains({
      error: false,
      message: 'Fornecedor Atualizado com sucesso',
    })
  })

  test('[DELETE] Fornecedor invalid token', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const response = await client.delete(`fornecedor/${fornecedor.id}`).bearerToken('xxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[DELETE] Fornecedor to not found', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.delete(`fornecedor/${50}`).bearerToken(data.token)

    response.assertStatus(400)
    response.assertBodyContains({ Error: true, message: 'Fornecedor não localizado' })
  })

  test('[DELETE] Fornecedor success', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const data = await GeraToken()
    const response = await client.delete(`fornecedor/${fornecedor.id}`).bearerToken(data.token)

    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Fornecedor deletado com sucesso' })
  })
})
