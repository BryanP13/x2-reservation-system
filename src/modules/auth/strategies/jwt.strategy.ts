import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lee el token desde el header "Authorization"
      ignoreExpiration: false,
      secretOrKey: 'secret', // 🔐 reemplaza con variable de entorno después
    });
  }

  async validate(payload: { id: string; email: string }) {
    return { userId: payload.id, email: payload.email };
  }
}
