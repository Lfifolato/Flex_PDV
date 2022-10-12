import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/fornecedor', 'Fornecedor/FornecedorsController').apiOnly()
}).middleware('auth')
