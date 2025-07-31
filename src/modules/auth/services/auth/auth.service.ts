// src/modules/auth/services/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: { id: string; email: string }) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}