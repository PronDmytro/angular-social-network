import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EducationEntity } from './entities/education.entity';
import { UserSubscriber } from './entities/user.entity.subscriber';
import { AvatarFileEntity } from './entities/avatar-file.entity';
import { ToolsService } from '../core/tools.service';
import { S3StorageService } from '../core/s3-storage/s3-storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EducationEntity, AvatarFileEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSubscriber, ToolsService, S3StorageService],
})
export class UserModule {
}
