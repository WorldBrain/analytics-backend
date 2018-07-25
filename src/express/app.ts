const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
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
	
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(awsServerlessExpressMiddleware.eventContext())

	app.use((req, res, next) => {
		const origin = req.get('Origin')
		if (origin === 'http://memex.link' || origin === 'http://staging.memex.link') {
		  res.header("Access-Control-Allow-Origin", origin)
		}

		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, DNT")
		res.header("Access-Control-Allow-Credentials", "true")
		res.header("Access-Control-Allow-Methods", "GET, POST")
		next()
	})

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