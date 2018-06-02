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
	app.use(bodyParser.urlencoded({ extended: true }));
	
	app.get('/', function(req, res) {
		res.send('Hello, welcome to worldbrains analytics. The work is in progress.')
	})

	app.post('/generateToken', route(routes.generateToken))
	app.post('/eventlog', route(routes.eventLog))
	return app
}