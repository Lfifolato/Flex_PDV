import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/cliente', 'Cliente/ClientesController').apiOnly()
}).middleware('auth')
