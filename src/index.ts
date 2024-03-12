import express, { Request, Response } from 'express'
import { router } from './routes';
import 'reflect-metadata'
import { AppDataSource } from './database';


const server = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicialized!")
    })
    .catch((error) => {
        console.error(error)
    })

server.use(express.json())
server.use(router)

server.get(`/`, (request: Request, response: Response) => {
    return response.status(200).json({ message: 'APi - ON' })
})

server.listen(3030, () => console.log("Server on "))