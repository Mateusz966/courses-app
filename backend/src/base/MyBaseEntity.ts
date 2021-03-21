import { extend } from '@hapi/joi';
import { BadRequestException } from '@nestjs/common';
import { ApiErrorCode } from 'app-types/global';
import {
  PrimaryGeneratedColumn,
  ObjectType,
  getRepository,
  BaseEntity,
  FindOneOptions,
} from 'typeorm';

export class MyBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  static async findOrThrow<T extends BaseEntity>(
    this: ObjectType<T>,
    options: FindOneOptions<T>,
    error?: ApiErrorCode,
  ): Promise<T> {
    const one = await getRepository(this).findOne(options);
    if (!one) {
      throw new BadRequestException(error ?? ApiErrorCode.InvalidParams);
    }
    return one;
  }
}