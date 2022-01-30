import { TimestampEntity } from '../../core/entities/timestamp.entity';
import { EducationEntity } from './education.entity';
export declare class UserEntity extends TimestampEntity {
    id: string;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    isAdmin: boolean;
    educationData: EducationEntity[];
}
