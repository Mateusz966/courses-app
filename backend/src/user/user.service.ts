import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { setFileIfExists } from 'utils/setFileIfExist';
import { storDir } from 'utils/storDir';
import { UserCategories } from './entity/user-categories.entity';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { ChangeBasicDataDto } from './dto/change-basic-data.dto';

const path = require('path');

@Injectable()
export class UserService {
  constructor(private readonly categoryService: CategoryService) {}

  async getByEmail(email: string): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      return user || undefined;
    } catch (error) {
      throw error;
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

  async saveUser(newUser: UserDto): Promise<User> {
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
        const { categories } = await this.categoryService.areCategoriesExist({
          categories: newUser.userCategories,
        });
        categories.forEach((category, index) => {
          userCategories[index] = new UserCategories();
          userCategories[index].category = new Category();
          userCategories[index].user = savedUser;
          userCategories[index].category = category;
          categoriesToSave.push(userCategories[index]);
        });
      }
      await UserCategories.insert(categoriesToSave);
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async setUserData(
    userId,
    userData: ChangeBasicDataDto,
    photoFn: Express.Multer.File,
  ): Promise<any> {
    try {
      await User.update(userId, userData);
      const user = await User.findOne({ id: userId });

      if (photoFn) {
        await setFileIfExists(
          user,
          'photoFn',
          'user_photo',
          photoFn,
          true,
          512,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getMyPhoto(userId: string, res: Response) {
    const user = await User.findOne({ id: userId });
    const { photoFn } = user;
    console.log(user);
    try {
      if (!photoFn) {
        res.status(HttpStatus.OK).json(null);
      } else {
        res.sendFile(path.join(storDir(), 'user_photo/', photoFn));
      }
    } catch (error) {
      throw error;
    }
  }
}
