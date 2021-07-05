import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storDir } from 'utils/storDir';
import { UserObj } from '../../decorators/user-obj.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

const path = require('path');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile/details')
  @UseInterceptors(
    FileInterceptor('photoFn', {
      dest: path.join(`${storDir()}/user_photo`),
    }),
  )
  async setUserData(
    @Body() userData: any,
    @UserObj() user,
    @UploadedFile() photoFn: Express.Multer.File,
  ) {
    return this.userService.setUserData(user.id, userData, photoFn);
  }

  @UseGuards(JwtAuthGuard)
  @Get('avatar')
  async getMyPhoto(@UserObj() user, @Res() res) {
    return this.userService.getMyPhoto(user.id, res);
  }
}
