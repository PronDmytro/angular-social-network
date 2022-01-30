import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';
import { CurrentUser } from '../core/decorators/current-user.decorator';
import { UserDataResDto } from './dto/res/user-data.res.dto';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { IsAdminGuard } from './guard/is-admin.guard';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

  public constructor(private readonly userService: UserService) {
  }

  @Get('me')
  public async getCurrentUser(@CurrentUser() user: UserEntity): Promise<UserDataResDto> {
    return new UserDataResDto(user);
  }

  @Post('create')
  @UseGuards(IsAdminGuard)
  public async create(@Body() createUserData: CreateUserReqDto) {
    return await this.userService.create(createUserData);
  }

  @Get('get-all')
  public async findAll(): Promise<UserDataResDto[]> {
    const allUsers = await this.userService.findAll();
    const reformattedUsers: UserDataResDto[] = [];
    allUsers.forEach((user) => {
      reformattedUsers.push(new UserDataResDto(user));
    });
    return reformattedUsers;
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UserDataResDto> {
    return new UserDataResDto(await this.userService.findOne(id));
  }

  @Put('update')
  @UseGuards(IsAdminGuard)
  public async update(@Body() updateUserData: UpdateUserReqDto) {
    return await this.userService.update(updateUserData);
  }

  @Delete('remove/:id')
  @UseGuards(IsAdminGuard)
  public async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

}
