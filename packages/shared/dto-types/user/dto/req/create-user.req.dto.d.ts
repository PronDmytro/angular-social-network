import { CreateEducationDataReqDto } from './create-education-data.req.dto';
export declare class CreateUserReqDto {
    name: string;
    surname: string;
    email: string;
    password: string;
    isAdmin: boolean;
    educationData: CreateEducationDataReqDto[];
}
