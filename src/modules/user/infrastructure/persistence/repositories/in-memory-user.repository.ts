// src/modules/user/infrastructure/persistence/repositories/in-memory-user.repository.ts

import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    // 🔑 Hasheamos la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User(
      user.name,
      user.email,
      hashedPassword, // se guarda el hash, no el plain text
      this.users.length + 1,
    );
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValid = await user.isPasswordValid(password);
    return isValid ? user : null;
  }
}
