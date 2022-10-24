import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import MovEstoque from 'App/Models/MovEstoque'
import { FornecedorFactory } from 'Database/factories/FornecedorFactory'
import { ProdutoFactory } from 'Database/factories/ProdutoFactory'
import { GeraToken } from '../Utils/GeraToken'

test.group('Prod entrada', (group) => {
  group.each.setup(async () => {
    await Database.rawQuery('DELETE FROM tb_prod_entradas ')
    return Database.rawQuery('DELETE FROM tb_prod_entradas ')
  })
  group.teardown(async () => {
    await Database.rawQuery('DELETE FROM tb_prod_entradas ')
    return Database.rawQuery('DELETE FROM tb_prod_entradas ')
  })

  test('[GET] Entrada_Produto All invalid Token', async ({ client }) => {
    const response = await client.get('/entrada').bearerToken('xxxxxxx')
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[GET] Entrada_Produto All success', async ({ client }) => {
    const data = await GeraToken()

    const response = await client.get('/produto').bearerToken(data.token)
    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('[POST] Entrada_Produto create invalid Token', async ({ client }) => {
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()

    const dataProdEntrada = {
      id_produto: Produto.id,
      qtd_entrada: 10,
      ref_nf: false,
    }

    const response = await client.post('/entrada').bearerToken('xxxxxxx').json(dataProdEntrada)
    response.assertStatus(401)
    response.assertBodyContains({ errors: [] })
  })

  test('[POST] Entrada_Produto create produto to not found ', async ({ client }) => {
    const data = await GeraToken()
    const fornecedor = await FornecedorFactory.create()
    await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()

    const dataProdEntrada = {
      id_produto: 99,
      qtd_entrada: 10,
      ref_nf: false,
    }

    const response = await client.post('/entrada').bearerToken(data.token).json(dataProdEntrada)
    response.assertStatus(400)
    response.assertBodyContains({ error: true, message: 'Produto não localizado' })
  })
  test('[POST] Entrada_Produto create produto success ', async ({ client }) => {
    const data = await GeraToken()
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()

    const dataProdEntrada = {
      id_produto: Produto.id,
      qtd_entrada: 10,
      ref_nf: false,
    }

    const response = await client.post('/entrada').bearerToken(data.token).json(dataProdEntrada)
    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Entrada criada com sucesso' })
  })

  test('[POST] Entrada_Produto create exist Mov_estoque success ', async ({ client, assert }) => {
    const data = await GeraToken()
    const fornecedor = await FornecedorFactory.create()
    const Produto = await ProdutoFactory.merge({ id_fornecedor: fornecedor.id }).create()

    const dataProdEntrada = {
      id_produto: Produto.id,
      qtd_entrada: 10,
      ref_nf: false,
    }

    const response = await client.post('/entrada').bearerToken(data.token).json(dataProdEntrada)

    const validMovEstoque = await MovEstoque.query()
      .where('id_Produto', Produto.id)
      .where('quantidade', 10)
      .where('tipo', 'E')
    assert.notEmpty(validMovEstoque)
    response.assertStatus(200)
    response.assertBodyContains({ error: false, message: 'Entrada criada com sucesso' })
  })
})
