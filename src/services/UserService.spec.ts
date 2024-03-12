import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    const mockuser = {
        user_id: '12345678',
        name: 'Alexandre',
        email: 'alx@teste.com',
        password: '12345678'
    }


    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockuser))
        const response = await userService.creatUser('Alexandre', 'alx@teste.com', '12345678');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            user_id: '12345678',
            name: 'Alexandre',
            email: 'alx@teste.com',
            password: '12345678'
        })
    })

    it('Deve retornar um token', async () => {

        jest.spyOn(userService, 'getAutehnticatedUser').mockImplementation(() => Promise.resolve(mockuser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getTokens('alx@teste.com', '12345678')
        expect(token).toBe('token')
        console.log(token)
    })

    it('Deve retornar um erro ao tentar gerar um token', async () => {  
        jest.spyOn(userService, 'getAutehnticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getTokens('invalid@gmam.com', '12345678')).rejects.toThrow('User not found')


    })
})