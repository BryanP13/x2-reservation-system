// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';
import { AuthModule } from '../auth/auth.module'; // ← IMPORTAR

@Module({
  imports: [AuthModule], // ← AGREGAR
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
    CreateUserUseCase,
    ValidateUserUseCase,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}