import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../../services/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanLoad {

  public constructor(
    private userDataService: UserDataService,
  ) {
  }

  public canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // TODO: normalize routing if false
    return this.userDataService.isAdmin();
  }

}
