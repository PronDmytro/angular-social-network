import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import validator from 'validator';
import { IsEmailRegisteredResDto } from './dto/res/is-email-registered.res.dto';
import { LoginResDto } from './dto/res/login.res.dto';
import { LoginReqDto } from './dto/req/login.req.dto';

@Controller('auth')
export class AuthController {

  public constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Get('/check-email/:email')
  public async checkEmail(@Param('email') email: string): Promise<IsEmailRegisteredResDto> {
    if (!validator.isEmail(email)) {
      throw new BadRequestException(`checkEmail: param is not an email: "${email}"`);
    }
    const isRegistered = await this.authService.isEmailRegistered(email);
    return { isRegistered: isRegistered };
  }

  @Post('/login')
  public async loginWithEmailAndPw(@Body() emailAndPw: LoginReqDto): Promise<LoginResDto> {
    const userFound = await this.authService.getUserByEmailPw(emailAndPw);
    const jwt = this.authService.generateJwtToken(userFound);
    return { token: jwt };
  }

}
