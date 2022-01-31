import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { FileEntity } from '../../core/entities/file.entity';
import { UserEntity } from './user.entity';

@Entity('avatar-file')
export class AvatarFileEntity extends FileEntity {

  @OneToOne(() => UserEntity, (user) => user.avatar, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: UserEntity;

}
