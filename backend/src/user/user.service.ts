import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCategories } from './entity/user-categories.entity';
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
      const userCategories = new UserCategories();

      user.email = newUser.email;
      user.lastName = newUser.lastName;
      user.firstName = newUser.firstName;
      user.password = newUser.password;
 
      const savedUser = await User.save(user); 

    

      userCategories.user = savedUser;
      //@ts-ignore
      userCategories.category = newUser.category

      UserCategories.save(userCategories);

      console.log(userCategories);
      console.log(savedUser); 

      // const savedCategory = newUser.category.map(async (categoryId, index) => {
      //   //@ts-ignore
      //   userCategories.category = newUser.category[index];
      //   userCategories.user = savedUser;
      //   return await UserCategories.save(userCategories)
      // })

      // const res = await Promise.all(savedCategory);
      //@ts-ignore
 
    } catch (error) {
      console.error(error);
    }
  }
}
