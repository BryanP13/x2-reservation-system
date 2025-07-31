// src/modules/user/domain/repositories/user.repository.interface.ts

import { User } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY'); // ✅ TOKEN

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  validateUser(email: string, password: string): Promise<User | null>;
}

