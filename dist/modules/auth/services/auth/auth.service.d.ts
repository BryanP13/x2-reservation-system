import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: {
        id: string;
        email: string;
    }): Promise<{
        access_token: string;
    }>;
}
