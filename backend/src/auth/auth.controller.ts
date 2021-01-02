import { Controller, Post, Body, HttpException, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';



@Controller('auth')
export class AuthController {

  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post('sign-up')
  async registerUser(@Body() user: UserDto) {
    const { password } = user;
    try {
      const hashedPassword =  await this.authService.hashPassword(password);
      const userToSave = { ...user, password: hashedPassword };
      const registeredUser = await this.userService.getByEmail(user.email);
      if (!registeredUser) {
        await this.userService.saveUser(userToSave);
      } else {
        throw new HttpException('Given email is taken', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUserDetails(@Req() request: any) {
    const { email } = request.user;
    return await this.userService.getByEmail(email);
  }
}