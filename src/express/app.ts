const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const cors = require('cors')
const compression = require('compression')

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

	app.use(compression())
	app.use(cors())
	
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(awsServerlessExpressMiddleware.eventContext())

	app.get('/', function(req, res) {
		res.send('Hello, welcome to worldbrains analytics. The work is in progress.')
	})

	app.post('/user-token', route(routes.generateToken))
	app.post('/event', route(routes.eventLog))
	app.get('/uninstall', route(routes.uninstall))
	
	return app
}