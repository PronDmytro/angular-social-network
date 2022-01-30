import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';


export const emailRegex = /^(\w[\w-.+]*@(\w[\w-]*\.)+[\w-]{2,12})?$/;

export class CustomValidators extends Validators {

  public static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }

    };
  }

  public static override email(control: AbstractControl): ValidationErrors | null {
    if (CustomValidators.isEmptyInputValue(control.value.trim())) {
      return null;
    }
    return emailRegex.test(control.value.trim()) ? null : { 'email': true };
  }

  private static isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
  }

}
