import { UpdateEducationDataReqDto } from './update-education-data.req.dto';
export declare class UpdateUserReqDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    isAdmin: boolean;
    educationData: UpdateEducationDataReqDto[];
}
