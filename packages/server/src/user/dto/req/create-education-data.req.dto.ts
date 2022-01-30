import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDataReqDto {

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
