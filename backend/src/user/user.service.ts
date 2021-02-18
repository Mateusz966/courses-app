import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCategories } from './entity/user-categories.entity';
import { User } from './entity/user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor() {}

  async getByEmail(email: string): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
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
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async saveUser(newUser: UserDto): Promise<any> {
    try {
      const user = new User();

      user.email = newUser.email;
      user.lastName = newUser.lastName;
      user.firstName = newUser.firstName;
      user.password = newUser.password;

      const savedUser = await User.save(user);

      const userCategories: UserCategories[] = [];
      const categoriesToSave: UserCategories[] = [];

      if (newUser?.userCategories) {
        newUser.userCategories.forEach((category, index) => {
          userCategories[index] = new UserCategories();
          userCategories[index].user = savedUser;
          userCategories[index].category = category;
          categoriesToSave.push(userCategories[index]);
        });
      }

      return await UserCategories.insert(categoriesToSave);
    } catch (error) {
      console.error(error);
    }
  }
  async setUserData(userId, userData: UserDto): Promise<any> {
    try {
      await User.update(userId, userData);
      return await User.findOne({ id: userId });
    } catch (error) {
      console.error(error);
    }
  }
}
