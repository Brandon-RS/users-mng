import Server from './models/server'
import * as dotenv from 'dotenv'
dotenv.config()

const server = new Server()
server.listen()
