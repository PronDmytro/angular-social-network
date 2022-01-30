import { IsArray, IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UpdateEducationDataReqDto } from './update-education-data.req.dto';

export class UpdateUserReqDto {

  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public surname: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsBoolean()
  @IsNotEmpty()
  public isAdmin: boolean;

  @IsArray()
  @IsNotEmpty()
  public educationData: UpdateEducationDataReqDto[];

}
