import { IsString } from 'class-validator';

export class TokenResDto {

  @IsString()
  public token: string;

}
