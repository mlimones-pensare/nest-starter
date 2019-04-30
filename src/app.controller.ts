import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/User';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard())
  @Get('/user')
  async getUser(@Req() req) {
    return { user: req.user };
  }

  @Post('/users')
  async createUser() {
    let user = new User();
    user.email = "user@user.com";
    user.password = "password123";
    user.isActive = false;
    user = await this.userRepository.save(user);
    return user;
  }

  @Get('/users')
  async getUsers() {
    return await this.userRepository.find();
  }
}
