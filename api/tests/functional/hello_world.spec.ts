import { test } from '@japa/runner'

test('Server On', async ({ client }) => {
  const response = await client.get('/')
  response.assertStatus(200)
  response.assertBodyContains({ version: 'v1', service: 'Api Flex_PDV' })
})
