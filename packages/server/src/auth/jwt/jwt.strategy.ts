import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import conf from '../../conf';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-user') {

  public constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: conf.userJwtSecret,
    });
  }

  public async validate(payload: JwtPayload) {
    return this.userRepository.findOne({ id: payload.userId });
  }

}
