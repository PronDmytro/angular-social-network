import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateEducationDataReqDto } from './create-education-data.req.dto';

export class CreateUserReqDto {

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public surname: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsBoolean()
  @IsNotEmpty()
  public isAdmin: boolean;

  @IsString()
  @IsNotEmpty()
  public avatar: string;

  @IsNotEmpty()
  public educationData: CreateEducationDataReqDto[];

}
