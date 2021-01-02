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
 
}
