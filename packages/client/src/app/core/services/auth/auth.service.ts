import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { IsEmailRegisteredResDto, LoginReqDto, LoginResDto } from '@shared/dto-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {

  public readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public readonly AUTH_TOKEN_KEY = 'user_auth_jwt';

  public constructor(
    http: HttpClient,
    conf: ConfigurationService,
    private readonly localStorageService: LocalStorageService,
    private router: Router,
  ) {
    super(http, conf);

    const token = this.getToken();
    if (token) {
      this.isLoggedIn$.next(true);
    }
  }

  protected override get apiPrefix(): string {
    return super.apiPrefix + '/auth';
  }

  /**
   * @returns {boolean} whether user is logged in or not now
   */
  public isLoggedIn(): boolean {
    return this.isLoggedIn$.value;
  }

  public async authByToken(token: string): Promise<void> {
    this.localStorageService.setItem(this.AUTH_TOKEN_KEY, token);
    this.isLoggedIn$.next(true);
  }

  public getToken() {
    return this.localStorageService.getItem(this.AUTH_TOKEN_KEY);
  }

  public async logout() {
    this.localStorageService.removeItem(this.AUTH_TOKEN_KEY);
    this.isLoggedIn$.next(false);
    await this.router.navigate(['auth/login']);
  }

  public async isEmailRegistered(email: string): Promise<boolean> {
    const res = await firstValueFrom(
      this.get<IsEmailRegisteredResDto>('/check-email/' + encodeURIComponent(email)),
    );
    return res.isRegistered;
  }

  public async auth(email: string, password: string): Promise<{ success: boolean }> {
    try {
      const resp = await firstValueFrom(
        this.post<LoginReqDto, LoginResDto>('/login/', { email, password }),
      );
      await this.authByToken(resp.token);

      return { success: true };
    } catch (e: any) {
      return { success: false };
    }

  }

}
