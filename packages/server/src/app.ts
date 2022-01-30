import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import conf from './conf';
import { json } from 'body-parser';
import { Logger } from 'nestjs-pino';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as compression from 'compression';
import * as SlowDown from 'express-slow-down';

export async function createMainApp() {
  const appOptions: NestApplicationOptions = {
    cors: true,
    bufferLogs: false,
  };
  const app = await NestFactory.create(ApplicationModule, appOptions);
  const expressApp = app.getHttpAdapter() as ExpressAdapter;

  app.useLogger(app.get(Logger));


  expressApp.disable('x-powered-by');

  app.use(compression());

  app.setGlobalPrefix(conf.apiUrlPath);

  app.use(json({ limit: conf.uploadLimit }));

  if (conf.rateLimit.enabled) {
    expressApp.enable('trust proxy'); // heroku proxy
    app.use(SlowDown(conf.slowDown));
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: conf.env.prod,
    }),
  );


  return app;
}
