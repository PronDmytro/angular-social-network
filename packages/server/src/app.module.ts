import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import conf from './conf';
import { pick } from 'lodash';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ExceptionsModule } from './core/exceptions/exceptions.module';
import { pinoConf } from './core/pino-logger-config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(conf.typeormConfig),
    LoggerModule.forRoot(pinoConf),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static', 'client'),
      serveRoot: '/app',
    }),
    ThrottlerModule.forRoot({
      ttl: conf.rateLimit.throttleTtlSeconds,
      limit: conf.rateLimit.throttleLimit,
    }),
    ExceptionsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    ...(conf.rateLimit.enabled ? [{
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }] : []),
  ],
})
export class ApplicationModule implements NestModule {

  public constructor(private readonly connection: Connection) {
    const someConnOps = pick(connection.options, ['type', 'database', 'username']);
    new Logger('ApplicationModule').log('ApplicationModule loaded, connection: ' + JSON.stringify(someConnOps));
  }

  public configure(consumer: MiddlewareConsumer) {
    // empty yet
  }

}
