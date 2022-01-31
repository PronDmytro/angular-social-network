import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { EducationEntity } from './entities/education.entity';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { S3StorageService } from '../core/s3-storage/s3-storage.service';
import { AvatarFileEntity } from './entities/avatar-file.entity';
import { ToolsService } from '../core/tools.service';

export type DataToCreateUser = Omit<CreateUserReqDto, 'avatar'> & { avatar: Buffer }

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EducationEntity)
    private readonly educationRepository: Repository<EducationEntity>,
    @InjectRepository(AvatarFileEntity)
    private readonly avatarFileRepository: Repository<AvatarFileEntity>,
    private readonly s3StorageService: S3StorageService,
    private readonly toolsService: ToolsService,
  ) {
  }

  public async create(createUserData: DeepPartial<DataToCreateUser>) {
    const avatar = createUserData.avatar ? await this.uploadAvatar(<Buffer>createUserData.avatar) : null;
    const user = this.userRepository.create({
      name: createUserData.name,
      surname: createUserData.surname,
      email: createUserData.email,
      passwordHash: createUserData.password,
      isAdmin: createUserData.isAdmin,
      avatar: avatar,
    });
    await this.userRepository.save(user);
    for (const data of createUserData.educationData) {
      const educationData = this.educationRepository.create({ user: user, ...data });
      await this.educationRepository.save(educationData);
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['educationData'] });
  }

  public findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  public async update(dataToUpdate: UpdateUserReqDto) {
    const user = await this.userRepository.findOne(dataToUpdate.id);
    user.name = dataToUpdate.name;
    user.surname = dataToUpdate.surname;
    user.email = dataToUpdate.email;
    user.isAdmin = dataToUpdate.isAdmin;

    if (dataToUpdate.password) {
      user.passwordHash = dataToUpdate.password;
    }

    if (dataToUpdate.avatar) {
      await this.avatarFileRepository.delete({ user: user });
      user.avatar = await this.uploadAvatar(<Buffer>(this.toolsService.imageBase64ToBuffer(dataToUpdate.avatar)));
    }

    await this.userRepository.save(user);
    const userEdData = await this.educationRepository.find({ user: user });

    for (const edData of userEdData) {
      const index = dataToUpdate.educationData.findIndex((el) => el?.id === edData.id);
      if (index !== -1) {
        const newData = dataToUpdate.educationData[index];
        edData.startDate = newData.startDate;
        edData.endDate = newData.startDate;
        edData.grade = newData.grade;
        edData.fieldOfStudy = newData.fieldOfStudy;
        edData.degree = newData.degree;
        edData.school = newData.school;
        await this.educationRepository.save(edData);

        dataToUpdate.educationData.slice(index, 1);
      } else {
        await this.educationRepository.remove(edData);
      }
    }
    if (dataToUpdate.educationData.length > 0) {
      for (const data of dataToUpdate.educationData) {
        const educationData = this.educationRepository.create({ user: user, ...data });
        await this.educationRepository.save(educationData);
      }
    }
  }

  public async remove(id: string) {
    await this.userRepository.delete({ id: id });
  }

  private async uploadAvatar(fileBuffer: Buffer): Promise<AvatarFileEntity> {
    const res = await this.s3StorageService.uploadFile(fileBuffer);
    const newFile = this.avatarFileRepository.create({
      url: res.Location,
      key: res.Key,
    });
    return await this.avatarFileRepository.save(newFile);
  }

}
