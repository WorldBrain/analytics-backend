require('source-map-support').install()
import * as http from 'http'
import createApp from './express/app'
import { createHttpServer } from './server'
import { createAppComponents } from './components'
import { createAppControllers } from './controllers'
import { createAppRoutes } from './express/routes'

export async function main(config = null) : Promise<any> {
    const components = createAppComponents({baseUrl: 'http://localhost:3000'})

    const controllers = createAppControllers(components)
    const routes = createAppRoutes(controllers)

    const app = createApp({routes})
    const server = await createHttpServer(app)
    
    console.log('Server started  :)')
    return server
}

if(require.main === module) {
	main()
}