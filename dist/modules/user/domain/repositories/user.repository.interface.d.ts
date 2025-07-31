import { User } from '../entities/user.entity';
export declare const USER_REPOSITORY: unique symbol;
export interface IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    validateUser(email: string, password: string): Promise<User | null>;
}
