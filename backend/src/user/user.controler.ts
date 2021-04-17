import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserObj } from 'decorators/user-obj.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { storDir } from 'utils/storDir';
import { UserService } from './user.service';
const path = require('path');

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Post('profile/details')
  @UseInterceptors(FileInterceptor('photoFn', {
    dest: path.join(storDir() + '/user_photo'),
  }))
  async setUserData(
    @Body() userData: any,
    @UserObj() user,
    @UploadedFile() photoFn: Express.Multer.File) {
    return await this.userService.setUserData(user.id, userData, photoFn);
  }


  @UseGuards(JwtAuthGuard)
  @Get('avatar')
  async getMyPhoto(
    @UserObj() user,
    @Res() res
  ) {
    return await this.userService.getMyPhoto(user.id, res);
  }

}
