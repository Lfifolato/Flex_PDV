import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/entrada', 'ProdEntrada/ProdEntradasController').apiOnly()
}).middleware('auth')
