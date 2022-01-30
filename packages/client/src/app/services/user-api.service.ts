import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api/api.service';
import { firstValueFrom } from 'rxjs';
import { CreateUserReqDto, UpdateUserReqDto, UserDataResDto } from '@shared/dto-types';

export type UserData = UserDataResDto;

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends ApiService {

  protected override get apiPrefix() {
    return super.apiPrefix + '/user';
  }


  public async getUserData(): Promise<UserData> {
    return await firstValueFrom(this.get<UserData>('/me'));
  }

  public async getAllUsers(): Promise<UserData[]> {
    return await firstValueFrom(this.get<UserData[]>('/get-all'));
  }

  public async getUserDataById(id: string): Promise<UserData> {
    return await firstValueFrom(this.get<UserData>('/' + id));
  }

  public async createUser(data: CreateUserReqDto): Promise<null> {
    return await firstValueFrom(this.post<CreateUserReqDto>('/create', data));
  }

  public async updateUserData(data: UpdateUserReqDto): Promise<null> {
    return await firstValueFrom(this.put<UpdateUserReqDto>('/update', data));
  }

  public async deleteUser(id: string): Promise<null> {
    return await firstValueFrom(this.delete('/remove/' + id));
  }


}
