import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly  authService: AuthService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  async login() {
    let token = await this.authService.signIn();
    return { token };
  }

  @UseGuards(AuthGuard())
  @Get('/user')
  async getUser(@Req() req) {
    return { user: req.user };
  }
}
