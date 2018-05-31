import * as http from 'http'

export async function createHttpServer(app) {
    const server = http.createServer(app)
    await new Promise((resolve, reject) => {
      server.listen(parseInt(process.env.PORT) || 3000, (err) => {
        if (err) { return reject(err) }
        resolve(server)
      })
    })

    return server
}