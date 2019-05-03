import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './credentials';
import { log } from 'util';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() body: Credentials) {
    let token = await this.authService.signIn(body);
    return { token };
  }

}
