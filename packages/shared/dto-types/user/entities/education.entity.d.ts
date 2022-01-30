import { TimestampEntity } from '../../core/entities/timestamp.entity';
import { UserEntity } from './user.entity';
export declare class EducationEntity extends TimestampEntity {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
    grade: string;
    user: UserEntity;
}
