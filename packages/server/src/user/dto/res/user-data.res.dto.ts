import { UserEntity } from '../../entities/user.entity';
import { Exclude } from 'class-transformer';

export class UserDataResDto extends UserEntity {

  public constructor(user: UserEntity) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  public override passwordHash: string;

}
