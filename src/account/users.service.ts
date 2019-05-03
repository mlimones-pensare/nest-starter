import { Injectable } from '@nestjs/common';
import { User } from '../entity/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){ }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email: email});
  }

}
