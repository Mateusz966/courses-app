import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { UserCategories } from './entity/user-categories.entity';
import { User } from './entity/user.entity';
import { UserController } from './user.controler';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserCategories]), CategoryModule],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
