import { IsBoolean } from 'class-validator';

export class IsEmailRegisteredResDto {

  @IsBoolean()
  public isRegistered: boolean;

}
