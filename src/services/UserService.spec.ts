import { UserService } from "./UserService";

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)


    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            user_id: '12345678',
            name: 'Alexandre',
            email: 'alx@teste.com',
            password: '12345678'
        }))
        const response = await userService.creatUser('Alexandre', 'alexandre@test.com', '12345678');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            user_id: '12345678',
            name: 'Alexandre',
            email: 'alx@teste.com',
            password: '12345678'
        })
    })
})