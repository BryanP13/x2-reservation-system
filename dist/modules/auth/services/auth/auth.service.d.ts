import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: {
        id: string;
        email: string;
    }): Promise<{
        access_token: string;
    }>;
}
