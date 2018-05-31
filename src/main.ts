require('source-map-support').install()
import * as http from 'http'
import createApp from './express/app'
import { createHttpServer } from './server'

export async function main(config = null) : Promise<any> {
    // const components = createAppComponents({
    //   baseUrl: settings.baseUrl,
    //   awsBucket: settings.awsBucket
    // })

    const app = createApp()
    const server = await createHttpServer(app)
    
    console.log('Server started  :)')
    return server
}

if(require.main === module) {
	main()
}