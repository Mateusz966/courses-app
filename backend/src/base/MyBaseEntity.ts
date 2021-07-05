import { BadRequestException } from '@nestjs/common';
import {
  PrimaryGeneratedColumn,
  ObjectType,
  getRepository,
  BaseEntity,
  FindOneOptions,
} from 'typeorm';
import { ApiErrorCode } from '../../app-types';

export class MyBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  static async findOrThrow<T extends BaseEntity>(
    this: ObjectType<T>,
    options: FindOneOptions<T>,
    error?: ApiErrorCode,
  ): Promise<T> {
    const one = await getRepository(this).findOne(options);
    console.log(one);
    if (!one) {
      throw new BadRequestException({
        errorCode: error ?? ApiErrorCode.InvalidParams,
      });
    }
    return one;
  }
}
