import { UserEntity } from '../../entities/user.entity';
export declare class UserDataResDto extends UserEntity {
    constructor(user: UserEntity);
    passwordHash: string;
}
