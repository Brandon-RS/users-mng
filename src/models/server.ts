import express, { Express } from 'express'
import cors from 'cors'
import router from '../routes/user.routes'

export default class Server {
  app: Express
  port: string
  usersPath: string

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '5000'
    this.usersPath = '/api/users'

    this.middlewares()
    this.routes()
  }

  middlewares (): void {
    this.app.use(cors())
    this.app.use(express.static('public'))
    this.app.use(express.json())
  }

  routes (): void {
    this.app.use(this.usersPath, router)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port: ${this.port}`)
    })
  }
}
