import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCategories } from './entity/user-categories.entity';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserCategories])],
    providers: [UserService],
    exports: [UserService, TypeOrmModule],
    controllers: []
  })
export class UserModule {}
