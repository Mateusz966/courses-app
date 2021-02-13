import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserObj } from "decorators/user-obj.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller('user')

export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async setUserData(@Body() userData: any, @UserObj() user) {
    return await this.userService.setUserData(user.id, userData);
  }
}
