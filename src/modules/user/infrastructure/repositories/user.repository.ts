// src/modules/user/infrastructure/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const ormUser = this.ormRepo.create(user);
    const saved = await this.ormRepo.save(ormUser);
    return new User(saved.name, saved.email, saved.password, saved.id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormUser = await this.ormRepo.findOne({ where: { email } });
    if (!ormUser) return null;
    return new User(ormUser.name, ormUser.email, ormUser.password, ormUser.id);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
  const user = await this.findByEmail(email);
  if (!user) return null;

  const isValid = await user.isPasswordValid(password); // ← usa await
  return isValid ? user : null;
  }

}
