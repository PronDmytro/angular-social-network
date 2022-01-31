import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  public constructor(
    public readonly authService: AuthService,
    public readonly userDataService: UserDataService,
  ) {
  }

}
