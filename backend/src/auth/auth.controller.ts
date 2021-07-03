import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import { LocalGuard } from './local-strategy.guard';
import { ApiErrorCode } from '../../app-types/global';
import { UserObj } from 'decorators/user-obj.decorator';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('sign-in')
  async logIn(@Req() request, @Res() response) {
    const { user } = request;
    const cookie = await this.authService.getCookieWithJwtToken(user.id);
    console.log(cookie)
    response.setHeader('Set-Cookie', cookie);
    const { password, ...userRes } = user;
    response.send(userRes);
  }

  @Post('sign-up')
  async registerUser(@Body() user: UserDto) {
    const { password } = user;
    try {
      const hashedPassword = await this.authService.hashPassword(password);
      const userToSave = { ...user, password: hashedPassword };
      const registeredUser = await this.userService.getByEmail(user.email);
      if (!registeredUser) {
        return await this.userService.saveUser(userToSave);
      } else {
        throw new HttpException(
          {
            errorCode: ApiErrorCode.EmailIsTaken,
            message: [
              {
                path: 'email',
                message: 'Given email is taken',
              },
            ],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUserDetails(@Req() request: any) {
    const { email } = request.user;
    const user = await this.userService.getByEmail(email);
    const { password, ...userRes } = user;
    return userRes;
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile/set-password')
  async setPassword(@Body() userData: any, @UserObj() user) {
    return await this.authService.setPassword(user.id, userData);
  }
}
