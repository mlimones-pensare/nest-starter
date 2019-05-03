import { BadRequestException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt-payload';
import { Credentials } from './credentials';
import { UsersService } from '../account/users.service';
import { User } from '../entity/User';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: Credentials): Promise<string> {
    let user = await this.retrieveUser(credentials)

    await this.validateCredentials(user, credentials);

    const payload: JwtPayload = { email: user.email };

    return this.jwtService.sign(payload);
  }


  async validateCredentials(user: User, credentials: Credentials){
    if(user.password != credentials.password){
      throw new BadRequestException("email or password invalid");
    }
  }

  async retrieveUser(credentials: Credentials){
    let user = await this.usersService.findOneByEmail(credentials.email);
    if(!user){
      throw new BadRequestException("email or password invalid");
    }
    return user;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}
