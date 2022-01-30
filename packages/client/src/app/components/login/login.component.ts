import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../core/validators';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public hide = true;
  public loginForm: FormGroup;

  public constructor(private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [CustomValidators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      await this.authService.auth(this.loginForm.controls['email']?.value, this.loginForm.controls['password']?.value);
      // localStorage.setItem('user-Data', JSON.stringify(this.loginForm.value));
      this.router.navigate(['/']);
    }
  }

}
