import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationFilter } from 'src/filters/validation.filter';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from 'src/exception/validation.exception';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CustomLogger } from 'src/loggers/custom.logger';

async function bootstrap() {
  const logger = new CustomLogger();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true, // allows for http-only cookies
  });
  app.setGlobalPrefix('api/v1');

  // validation and http Filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          return {
            error: `${error.property} has wrong value ${error.value}.`,
            message: Object.values(error.constraints).join(''),
          };
        });
        return new ValidationException(messages);
      },
    }),
  );
  const PORT = process.env.PORT || 3006;
  await app.listen(PORT);
  logger.log(`Starting Authentication Service on port ${PORT}.`);
}
bootstrap();
