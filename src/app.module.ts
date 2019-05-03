import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(),
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
