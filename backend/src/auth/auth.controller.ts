import { Controller, Post, Body, HttpException, HttpStatus, Get, UseGuards, Req, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import { LocalGuard } from './local-strategy.guard';
import { ApiErrorCode } from '../../app-types/global';



@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('sign-in')
  async logIn(@Req() request, @Res() response) {
    const { user } = request;
    const cookie = await this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    const { password, ...userRes } = user;
    return response.send(userRes);
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
        throw new HttpException({
          errorCode: ApiErrorCode.EmailIsTaken,
          message: [{
            path: 'email',
            message: 'Given email is taken'
          }]
        }, HttpStatus.BAD_REQUEST);
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
}