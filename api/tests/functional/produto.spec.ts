/* eslint-disable eqeqeq */
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { GeraToken } from '../Utils/GeraToken'
import { ProdutoFactory } from 'Database/factories/ProdutoFactory'
import { FornecedorFactory } from 'Database/factories/FornecedorFactory'
import Log from 'App/Models/Log'
import Produto from 'App/Models/Produto'

test.group('Produtos', (group) => {
  group.each.setup(async () => {
    await Database.rawQuery('DELETE FROM produtos ')
    return Database.rawQuery('DELETE FROM produtos ')
  })
  group.teardown(async () => {
    await Database.rawQuery('DELETE FROM produtos ')
    return Database.rawQuery('DELETE FROM produtos ')
  })

  test('[GET] Produto All invalid Token', async ({ client }) => {
    const response = await client.get('/produto').bearerToken('xxxxxxx')
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] Produto All', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get('/produto').bearerToken(data.token)
    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[POST] Produto Create invalid Token', async ({ client }) => {
    const response = await client.post('/produto').bearerToken('xxxxx').json({
      id_fornecedor: 4,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] Produto Create validation field', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.post('/produto').bearerToken(data.token).json({
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })
    response.assertStatus(422)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] Produto invalid Create fornecedor not found', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.post('/produto').bearerToken(data.token).json({
      id_fornecedor: 50,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })

    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Fornecedor não localizado' })
  })

  test('[POST] Produto Create success', async ({ client }) => {
    const data = await GeraToken()
    const fornecedor = await FornecedorFactory.create()

    const response = await client.post('/produto').bearerToken(data.token).json({
      id_fornecedor: fornecedor.id,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 10,
      per_lucro: 20,
    })

    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Produto criado com sucesso' })
  })

  test('[POST] Produto Valid calc vlr_venda ', async ({ client, assert }) => {
    const data = await GeraToken()
    const fornecedor = await FornecedorFactory.create()

    const response = await client.post('/produto').bearerToken(data.token).json({
      id_fornecedor: fornecedor.id,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 10,
      per_lucro: 20,
    })
    const produtoCalc = await Produto.findBy('id_fornecedor', fornecedor.id)
    const calc = 10 + (10 * 20) / 100

    assert.equal(calc, produtoCalc?.vlr_venda)
    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Produto criado com sucesso' })
  })

  test('[GET] Produto Show invalid token', async ({ client }) => {
    const response = await client.get(`/produto/${99}`).bearerToken('xxxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] Produto to not found', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.get(`/produto/${50}`).bearerToken(data.token)

    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Produto não localizado' })
  })

  test('[GET] Produto success', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()
    const data = await GeraToken()
    const response = await client.get(`/produto/${Produto.id}`).bearerToken(data.token)

    response.assertStatus(200)
    response.assertBodyContains({})
  })

  test('[PUT] Produto Update invalid token', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()

    const response = await client.get(`/produto/${Produto.id}`).bearerToken('xxxx').json({
      id_fornecedor: fornecedor.id,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[PUT] Produto Update to not found', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const data = await GeraToken()
    const response = await client.get(`/produto/${50}`).bearerToken(data.token).json({
      id_fornecedor: fornecedor.id,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })

    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Produto não localizado' })
  })

  test('[PUT] Produto Update fornecedor not exist', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()

    const data = await GeraToken()
    const response = await client.put(`/produto/${Produto.id}`).bearerToken(data.token).json({
      id_fornecedor: 99,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })

    response.assertStatus(400)
    response.assertBodyContains({
      error: true,
      message: 'Fornecedor não localizado',
    })
  })

  test('[PUT] Produto Update success', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()
    const data = await GeraToken()
    const response = await client.put(`/produto/${Produto.id}`).bearerToken(data.token).json({
      id_fornecedor: fornecedor.id,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      error: false,
      message: 'Produto atualizado com sucesso',
    })
  })
  test('[PUT] Produto Update success Log create', async ({ client, assert }) => {
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()
    const data = await GeraToken()
    const response = await client.put(`/produto/${Produto.id}`).bearerToken(data.token).json({
      id_fornecedor: fornecedor.id,
      nome: 'Leite',
      descricao: 'Leite desnatado',
      vlr_custo: 5.6,
      per_lucro: 22,
    })
    const validLog = await Log.query().where('id_ref', Produto.id).where('table_name', 'Produtos')
    assert.notEmpty(validLog)
    response.assertStatus(200)
    response.assertBodyContains({
      error: false,
      message: 'Produto atualizado com sucesso',
    })
  })

  test('[DELETE] Produto invalid token', async ({ client }) => {
    const response = await client.delete(`/produto/${99}`).bearerToken('xxxx')

    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[DELETE] Produto to not found', async ({ client }) => {
    const data = await GeraToken()
    const response = await client.delete(`/produto/${999}`).bearerToken(data.token)
    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Produto não localizado' })
  })

  test('[DELETE] Produto success', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()
    const data = await GeraToken()
    const response = await client.delete(`/produto/${Produto.id}`).bearerToken(data.token)

    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Produto deletado com sucesso' })
  })
})
