// src/modules/user/user.module.ts

import { Module } from '@nestjs/common';
import { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface'; // ✅ usa el token

@Module({
  providers: [
    {
      provide: USER_REPOSITORY, // ✅ usa el token, no la interfaz
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
