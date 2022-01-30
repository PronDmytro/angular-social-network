import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateEducationDataReqDto {

  @IsUUID()
  @IsOptional()
  public id?: string;

  @IsString()
  @IsNotEmpty()
  public school: string;

  @IsString()
  @IsNotEmpty()
  public degree: string;

  @IsString()
  @IsNotEmpty()
  public fieldOfStudy: string;

  @IsDate()
  @IsNotEmpty()
  public startDate: Date;

  @IsDate()
  @IsNotEmpty()
  public endDate: Date;

  @IsString()
  @IsNotEmpty()
  public grade: string;

}
