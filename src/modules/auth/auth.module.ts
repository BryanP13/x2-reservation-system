// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', // Cambiar por variable de entorno
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService], // ← Exportar para usar en otros módulos
})
export class AuthModule {}