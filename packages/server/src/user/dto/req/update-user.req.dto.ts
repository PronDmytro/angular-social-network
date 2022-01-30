import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
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

  @IsString()
  @IsOptional()
  public avatar?: string;

  @IsArray()
  @IsNotEmpty()
  public educationData: UpdateEducationDataReqDto[];

}
