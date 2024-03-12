import { sign } from 'jsonwebtoken';
import { AppDataSource } from '../database';
import { User } from '../entities/User';
import { UserRepository } from './../repositories/UserRepository';


export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)

    ) {
        this.userRepository = userRepository;
    }

    creatUser = (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password);
        return this.userRepository.createUser(user);

    }

    getUser = () => {

    }

    getAutehnticatedUser = async (email: string, password: string): Promise<User | null> => {
        return this.userRepository.getuserByEmailAndPassword(email, password);
    }

    getTokens = async (email:string, password:string): Promise<string> => {
        const user = await this.getAutehnticatedUser(email, password);
        
        if(!user) throw new Error('User not found')

        const tokenData = {
            name: user?.name,
            email: user?.email
        }

        const tokenKey = '123456789'

        const tokenOption = {
            subject: user?.user_id,
            // expiresIn: '1h'
        }

        const token = sign(tokenData, tokenKey, tokenOption)
      
        return token;

    }


}