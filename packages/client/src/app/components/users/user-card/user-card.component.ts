import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../services/user-data.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  @Input() public user: User;

  public constructor() { }

  public ngOnInit(): void {
  }

}
