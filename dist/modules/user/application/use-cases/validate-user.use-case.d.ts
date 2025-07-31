import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
interface ValidateUserDto {
    email: string;
    password: string;
}
export declare class ValidateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(dto: ValidateUserDto): Promise<User | null>;
}
export {};
