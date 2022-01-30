import { FileEntity } from '../../core/entities/file.entity';
import { UserEntity } from './user.entity';
export declare class AvatarFileEntity extends FileEntity {
    user: UserEntity;
}
