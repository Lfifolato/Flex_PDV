import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/loginAdmin', 'Auth/SessionsController.LoginAdmin')
  Route.post('/loginPDV', 'Auth/SessionsController.LoginPDV')
})

Route.group(() => {
  Route.delete('/logout', 'Auth/SessionsController.Logout')
  Route.get('/token', 'Auth/SessionsController.Token')
}).middleware('auth')
