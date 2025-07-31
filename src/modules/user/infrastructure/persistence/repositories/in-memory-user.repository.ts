// src/modules/user/infrastructure/repositories/in-memory-user.repository.ts

import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    const newUser = new User(user.name, user.email, user.password, this.users.length + 1);
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  // ✅ ESTE MÉTODO DEBE ESTAR PRESENTE
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    return user.isPasswordValid(password) ? user : null;
  }
}
