import { Component, Input, OnInit } from '@angular/core';
import { User, UserDataService } from '../../../services/user-data.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  @Input() public user: User;

  public constructor(
    private router: Router,
    public userDataService: UserDataService,
    private modalService: NgbModal,
  ) {
  }

  public ngOnInit(): void {
  }

  public async detailed() {
    console.log('detailed');
    await this.router.navigate([`users/${this.user?.id}`]);
  }


  public deleteUser(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      async (result) => {
        if (result === '1') {
          await this.userDataService.deleteUser(this.user.id);
          await this.router.navigate(['users']);
        }
      });
  }

  public async editUser() {
    await this.router.navigate(['create-edit/' + this.user.id]);
  }

}
