import { Component, OnInit } from '@angular/core';
import { User, UserDataService } from '../../services/user-data.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  public users: User[];
  public stateCtrl = new FormControl();
  public filteredUsers: Observable<User[]>;

  public constructor(
    private userDataService: UserDataService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.users = await this.userDataService.getAllUsers();
    await this.userDataService.getUserData(true);
    this.filteredUsers = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.users.slice())),
    );
  }

  private _filterStates(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter((user) => (user.name.toLowerCase() + ' ' + user.surname.toLowerCase()).includes(filterValue));
  }

}
