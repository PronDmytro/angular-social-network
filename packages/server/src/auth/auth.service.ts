import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.interface';
import { UserNotFoundException } from '../core/exceptions/user-not-found.exception';
import * as argon2 from 'argon2';
import { WrongPasswordException } from '../core/exceptions/wrong-password.exception';

@Injectable()
export class AuthService {

  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {
  }

  public async isEmailRegistered(email: string): Promise<boolean> {
    const found = await this.userRepository.count({ email: email });
    return found > 0;
  }

  public generateJwtToken(user: UserEntity): string {
    const payload: JwtPayload = { userId: user.id };
    return this.jwtService.sign(payload);
  }

  public async getUserByEmailPw({ email, password }: { email: string, password: string }): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new UserNotFoundException(`user by email: ${email} not found`);
    }
    const isRightPw = await argon2.verify(user.passwordHash, password);
    if (!isRightPw) {
      throw new WrongPasswordException(`wrong password for user: ${email}`);
    }

    return user;
  }

}
