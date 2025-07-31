import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { ValidateUserUseCase } from '../../application/use-cases/validate-user.use-case';
import { AuthService } from '../../../auth/services/auth/auth.service';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly validateUserUseCase;
    private readonly authService;
    constructor(createUserUseCase: CreateUserUseCase, validateUserUseCase: ValidateUserUseCase, authService: AuthService);
    register(dto: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user: {
            id: number | undefined;
            name: string;
            email: string;
        };
    }>;
    login(dto: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        access_token?: undefined;
        user?: undefined;
    } | {
        message: string;
        access_token: string;
        user: {
            id: number | undefined;
            name: string;
            email: string;
        };
    }>;
    getProfile(req: any): {
        message: string;
        user: any;
    };
}
