import { Component, OnInit } from '@angular/core';
import { User, UserDataService } from '../../../services/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  public id: string | undefined;
  public user: User;

  public constructor(
    private userDataService: UserDataService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      try {
        this.user = await this.userDataService.getUserDataById(this.id);
      } catch (e) {
        this.toastr.error(this.translate.instant('CREATE-EDIT.FORM.messages.notFound'));
        this.router.navigate(['/']);
        return;
      }
    }
  }

}
