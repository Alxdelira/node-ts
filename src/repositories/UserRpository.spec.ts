import { EntityManager } from 'typeorm';
import { getMockEntityManager } from '../_mocks_/mockEntityManager.mock';
import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let managerMock: Partial<EntityManager>; 

    const mockUser: User = {
        user_id: '123',
        name: 'John Doe',
        email: 'jonh.doe@example.com',
        password: 'password'
    }

    beforeAll(async () => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser
        });
        userRepository = new UserRepository(managerMock as EntityManager);
    });

    it('Deve cadastrar um novo usuario no banco de dados', async () => {
        const response = await userRepository.createUser(mockUser);
        expect(managerMock.save).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser);
    });
});
