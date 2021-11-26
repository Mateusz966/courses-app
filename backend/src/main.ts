import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import rateLimit = require('express-rate-limit');
import { AppModule } from './app.module';
import { RequestConverterPipe } from './pipes/request-converter.pipe';
import { ValidDtoFilter } from '../filters/dto-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost', credentials: true },
  });
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 50000,
    }),
  );
  app.use(cookieParser());
  app.useGlobalFilters(new ValidDtoFilter());
  app.useGlobalPipes(
    new RequestConverterPipe(),
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3001);
}
bootstrap();
