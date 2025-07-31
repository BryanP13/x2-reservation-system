import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';  
import { UserModule } from './modules/user/user.module';     


@Module({
  imports: [UserModule],
  controllers: [AppController], // ← ESTO ES CRÍTICO
  providers: [AppService],      // ← ESTO TAMBIÉN
})
export class AppModule {}

