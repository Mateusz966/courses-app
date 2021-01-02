import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserDto } from './user.dto';


@Injectable()
export class UserService {
  constructor() { }

  async getByEmail(email: string): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          email,
        }
      });
      return user ? user : undefined;
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id: string) {
    const user = User.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async saveUser(newUser: UserDto): Promise<any> {

    try {
      const user = new User();

      user.email = newUser.email;
      user.lastName = newUser.lastName;
      user.firstName = newUser.firstName;
      user.password = newUser.password;

      await User.save(user);
    } catch (error) {
      console.error(error);
    }
  }
}