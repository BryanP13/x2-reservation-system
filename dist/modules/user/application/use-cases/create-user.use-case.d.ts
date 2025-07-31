import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(dto: CreateUserDto): Promise<User>;
}
export {};
