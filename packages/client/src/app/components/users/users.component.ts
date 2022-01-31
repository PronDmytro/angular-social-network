import { Component, OnInit } from '@angular/core';
import { User, UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  public users: User[];

  public constructor(
    private userDataService: UserDataService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.users = await this.userDataService.getAllUsers();
    await this.userDataService.getUserData(true);
  }

}
