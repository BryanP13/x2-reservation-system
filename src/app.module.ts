/*
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserOrmEntity } from './modules/user/infrastructure/entities/user.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Cambia a 'sqlite' si lo prefieres
      host: 'localhost',
      port: 5432,
      username: 'postgres', // 👈 pon tu usuario
      password: 'postgres', // 👈 pon tu contraseña
      database: 'x2_db',    // 👈 pon el nombre de tu BD
      entities: [UserOrmEntity],
      synchronize: true, // ❗ Solo para desarrollo, crea las tablas automáticamente
    }),
    UserModule,
  ],
})
export class AppModule {}
*/
// src/app.module.ts

import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}

