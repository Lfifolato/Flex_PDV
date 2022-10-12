import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/log/:table/:id', 'Log/LogsController.index')
}).middleware('auth')
