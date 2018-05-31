const express = require('express')
const bodyParser = require('body-parser')

export default function createApp() {
	const app = express()
	app.use(bodyParser.json())
	
	app.get('/', function(req, res) {
		res.send('Hello')
	})
	return app
}