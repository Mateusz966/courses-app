import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { hash, compare } from 'bcrypt';;
import { JwtService } from '@nestjs/jwt';
import { UserRes } from '../../../types/user';
import { User } from '../user/entity/user.entity';
import { UserDto } from '../user/user.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
      const hashedPassword = await hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      return error;
    }
  }

  async validateUser(user: UserDto): Promise<UserRes> {
    const { email } = user;
    try {
      const userInDb = await User.findOne({ email } );
      if (userInDb) {
        const isUserValid = await compare(user.password, userInDb.password);
        const { password, ...userRes } = userInDb;
        return isUserValid ? userRes : undefined;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: UserRes) {
    const { id, firstName, lastName, email } = user
    const payload = {
      email,
      id,
      firstName,
      lastName,
    };
    return {
      token: this.jwtService.sign(payload)
    }
  }

}