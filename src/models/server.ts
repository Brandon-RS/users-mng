import express, { Express } from 'express'
import cors from 'cors'
import { dbConnection } from '../db/config'
import routerUsers from '../routes/user.routes'
import routerAuth from '../routes/auth.routes'

export default class Server {
  app: Express
  port: string
  usersPath: string
  authPath: string

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '5000'
    this.usersPath = '/api/users'
    this.authPath = '/api/auth'

    void this.connectDB()
    this.middlewares()
    this.routes()
  }

  async connectDB (): Promise<void> {
    await dbConnection()
  }

  middlewares (): void {
    this.app.use(cors())
    this.app.use(express.static('public'))
    this.app.use(express.json())
  }

  routes (): void {
    this.app.use(this.authPath, routerAuth)
    this.app.use(this.usersPath, routerUsers)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port: ${this.port}`)
    })
  }
}
