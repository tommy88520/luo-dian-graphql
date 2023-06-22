import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
  });
  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log(new Date().toLocaleString());
    console.log(
      `App running on port ${port} and version is v${process.env.npm_package_version} 😊 `,
    );
  });
  if (process.env.NODE_ENV == 'prod') {
    Sentry.init({
      dsn: process.env.SENTRY_DNS,
    });
  }
}
bootstrap();
