require('source-map-support').install()
require('dotenv').config()
import * as http from 'http'
import createApp from './express/app'
import { createHttpServer } from './server'
import { createAppComponents } from './components'
import { createAppControllers } from './controllers'
import { createAppRoutes } from './express/routes'
import { getSettings } from './options'

let expressapp
async function main(config = null) : Promise<any> {
    const settings = getSettings()

    const components = createAppComponents(settings)

    const controllers = createAppControllers(components)
    const routes = createAppRoutes(controllers)

    const app = createApp({routes})
    const server = await createHttpServer(app)
    
    console.log('Server started  :)')
    expressapp = app
    return app
}

main()

export = expressapp