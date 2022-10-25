import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { version: 'v1', service: 'Api Flex_PDV' }
})

//Rota Auth
import './Auth/routes'

//Rota User
import './User/routes'

//Rota PDV
import './Pdv/routes'

//Rota Log
import './Log/routes'

//Rota Fornecedor
import './Fornecedor/routes'

//Rota Produto
import './Produto/routes'

//Rota prod_entrada
import './ProdEntrada/routes'

//Rota Cliente
import './Cliente/routes'
