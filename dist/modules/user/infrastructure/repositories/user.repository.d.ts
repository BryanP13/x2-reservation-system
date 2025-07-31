import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';
export declare class UserRepository implements IUserRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<UserOrmEntity>);
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    validateUser(email: string, password: string): Promise<User | null>;
}
