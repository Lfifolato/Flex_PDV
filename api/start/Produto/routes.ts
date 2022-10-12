import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/produto', 'Produto/ProdutosController').apiOnly()
}).middleware('auth')
