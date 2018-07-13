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

	app.get('/', function(req, res, next) {
		res.send('Hello, welcome to worldbrains analytics. The work is in progress.')
	})

	const isDNTEnabled = function (req, res, next) {
		// if do not track header is 1, it means no track and return response
		if(req.headers.dnt) {
			return res.json({success: false, message: 'Do not track is enabled'})
		} else {
			next()
		}
	}

	app.post('/user-token', isDNTEnabled, route(routes.generateToken))
	app.post('/event', isDNTEnabled, route(routes.eventLog))
	app.get('/uninstall', isDNTEnabled, route(routes.uninstall))

	app.use(function (err, req, res, next) {
		res.json({success: false, message: err.message})
	})
	
	return app
}