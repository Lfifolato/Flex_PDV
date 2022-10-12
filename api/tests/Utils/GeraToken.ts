import Env from '@ioc:Adonis/Core/Env'
import { UserFactory } from 'Database/factories/UserFactory'
import supertest from 'supertest'

const BASE_URL = `http://${Env.get('HOST')}:${Env.get('PORT')}`

export async function GeraToken() {
  const user = await UserFactory.merge({ password: '123' }).create()

  const { body } = await supertest(BASE_URL)
    .post('/loginAdmin')
    .send({ email: user.email, password: '123' })

  return { token: body.remember_me_token, user: user }
}
