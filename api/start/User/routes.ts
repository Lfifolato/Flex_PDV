import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/user', 'User/UsersController').apiOnly()
}).middleware('auth')
