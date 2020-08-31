const net = require('net')

function portIsOccupied(port) {
  const server = net.createServer().listen(port)
  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      console.log(`the server is runnint on port ${port}`)
      server.close()
      process.env.DEV_PORT = port
      process.env.PROD_PORT = port
      resolve(port)
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        //注意这句，如占用端口号+1
        resolve(portIsOccupied(port + 1))
        console.log(`this port ${port} is occupied.try another.`)
      } else {
        reject(err)
      }
    })
  })

}

export default portIsOccupied
