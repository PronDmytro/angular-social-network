import { Module } from '@nestjs/common';
import { UserNotFoundException } from './user-not-found.exception';
import { WrongPasswordException } from './wrong-password.exception';
import { BaseException } from './base.exeption';

@Module({
  providers: [
    BaseException,
    UserNotFoundException,
    WrongPasswordException,
  ],
  exports: [
    BaseException,
    UserNotFoundException,
    WrongPasswordException,
  ],
})
export class ExceptionsModule {
}
