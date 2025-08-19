import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
interface LoginUserDto {
    email: string;
    password: string;
}
export declare class LoginUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(dto: LoginUserDto): Promise<User>;
}
export {};
