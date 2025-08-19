// src/modules/auth/services/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: { id: string; email: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
