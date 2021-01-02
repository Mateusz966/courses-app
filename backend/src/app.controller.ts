import { Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local-strategy';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
    ) {}
 
  @HttpCode(200)
  @UseGuards(LocalStrategy)
  @Post('log-in')
  async logIn(@Req() request, @Res() response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    const { password, ...userRes } = user; 
    return response.send(userRes);
  }
}
