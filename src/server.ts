import * as http from 'http'

export async function createHttpServer(app) {
    const server = http.createServer(app)
    await new Promise((resolve, reject) => {
      server.listen(parseInt(process.env.PORT, 10) || 3000, () => {
        resolve(server)
      })
    })

    return server
}