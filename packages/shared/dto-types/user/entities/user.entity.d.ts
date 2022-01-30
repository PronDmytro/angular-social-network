import { TimestampEntity } from '../../core/entities/timestamp.entity';
import { EducationEntity } from './education.entity';
import { AvatarFileEntity } from './avatar-file.entity';
export declare class UserEntity extends TimestampEntity {
    id: string;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    isAdmin: boolean;
    avatar: AvatarFileEntity;
    educationData: EducationEntity[];
}
