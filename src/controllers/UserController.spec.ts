import { UserController } from "./UserController";
import { Request } from 'express'
import { makeMockResponse } from "../_mocks_/mockResponse.mock";

const mockUserService = {
    creatUser: jest.fn(),
    deleteUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {
   
    
    const userController = new UserController();
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Alexandre',
                email: 'alx.delira@test.com',
                password: '123456'
            }
        } as Request

        userController.creatUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'User Created' })
    })

    it('Deve retornar erro se o nome não for informado', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'alx.delira@gmail.com',
                password: '123456'
            }
        } as Request 

        userController.creatUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "Bad Request: Todos os campos são obrigatorios!" })
    })

    it('Deve retornar erro se o e-mail não for informado', () => {
        const mockRequest = {
            body: {
                name: 'Alexandre',
                email: '',
                password: '123456'
            }
        } as Request 

        userController.creatUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "Bad Request: Todos os campos são obrigatorios!" })
    })
    it('Deve retornar erro se o password não for informado', () => {
        const mockRequest = {
            body: {
                name: 'Alexandre',
                email: 'alx.delira@gmail.com',
                password: ''
            }
        } as Request 

        userController.creatUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: "Bad Request: Todos os campos são obrigatorios!" })
    })

    it('Deve retornar a mensagem de usuario deletado', ()=>{
        const mockRequest = {
            body: {
                name: 'Alexandre',
                email: ''
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'User Deleted' })
    })
})