const express = require('express')
const bodyParser = require('body-parser')
import { AppRoutes } from './routes'

export default function createApp(
	{routes,  allowUndefinedRoutes = false}: 
	{routes: AppRoutes,  allowUndefinedRoutes?: boolean}
) {
	function route(f?) {
		if (!f && allowUndefinedRoutes) {
			f = () => {}
		}
		return (req, res) => f({req, res})
	}

	const app = express()
	app.use(bodyParser.json())
	
	app.get('/', function(req, res) {
		res.send('Hello')
	})

	app.get('/generateToken', route(routes.generateToken))
	app.post('/eventlog', route(routes.eventLog))
	return app
}