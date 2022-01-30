import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EducationEntity } from './entities/education.entity';
import { UserSubscriber } from './entities/user.entity.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EducationEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
})
export class UserModule {
}
