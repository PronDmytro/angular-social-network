import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginReqDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public password: string;

  @IsEmail()
  public email: string;

}
