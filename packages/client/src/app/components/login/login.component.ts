import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../core/validators';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public hide = true;
  public loginForm: FormGroup;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [CustomValidators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      const res = await this.authService.auth(this.loginForm.controls['email']?.value, this.loginForm.controls['password']?.value);
      if (!res.success) {
        this.toastr.error(this.translate.instant('LOGIN.err.msg'), this.translate.instant('LOGIN.err.title'));
        return;
      }

      this.router.navigate(['/']);
    }
  }

}
