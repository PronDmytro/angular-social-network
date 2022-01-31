import { Injectable } from '@angular/core';
import { UserApiService, UserData } from './user-api.service';
import { CreateUserReqDto, UpdateUserReqDto, UserDataResDto } from '@shared/dto-types';

export type User = Omit<UserDataResDto, 'passwordHash'>;

@Injectable({
  providedIn: 'root',
})
export class UserDataService {

  private userData: User | null = null;

  public constructor(
    private readonly userApiService: UserApiService,
  ) {
  }

  /**
   * @param force force to make server request for new user data
   * @returns user data, cached
   */
  public async getUserData(force = false): Promise<User> {
    if (!this.userData || force) {
      this.userData = await this.userApiService.getUserData();
    }

    return this.userData;
  }

  public isAdmin(): boolean {
    return this.userData?.isAdmin || false;
  }

  public async getAllUsers(): Promise<UserData[]> {
    return await this.userApiService.getAllUsers();
  }

  public async getUserDataById(id: string): Promise<UserData> {
    return await this.userApiService.getUserDataById(id);
  }

  public async createUser(userData: CreateUserReqDto): Promise<{ success: boolean }> {
    try {
      await this.userApiService.createUser(userData);
      return { success: true };
    } catch (e: any) {
      return { success: false };
    }
  }

  public async updateUserData(userData: UpdateUserReqDto): Promise<{ success: boolean }> {
    try {
      await this.userApiService.updateUserData(userData);
      return { success: true };
    } catch (e: any) {
      return { success: false };
    }
  }

  public async deleteUser(id: string): Promise<null> {
    return await this.userApiService.deleteUser(id);
  }

}
