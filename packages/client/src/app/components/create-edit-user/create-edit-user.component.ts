import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserDataService } from '../../services/user-data.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../core/validators';
import { EducationData } from '../../services/user-api.service';
import imageCompression from 'browser-image-compression';
import { TranslateService } from '@ngx-translate/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// @ts-ignore
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CreateEditUserComponent implements OnInit {

  public id: string | undefined;
  public isEditMode = false;
  public user: User;
  public dataForm: FormGroup;
  public hidePw = true;
  public hidePWConfirm = true;
  public educationFormGroup: FormGroup;
  public educationFormArray: FormArray;
  private selectedAvatar: string;

  public get getEducationFormsArray() {
    return this.educationFormGroup.get('education') as FormArray;
  }

  public constructor(
    private readonly formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.dataForm = formBuilder.group(
      {
        name: ['', [Validators.required, CustomValidators.withoutSpecialCharacters]],
        surname: ['', [Validators.required, CustomValidators.withoutSpecialCharacters]],
        email: ['', [CustomValidators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), CustomValidators.password]],
        confirmPassword: ['', [Validators.required]],
        avatar: [null, [Validators.required]],
        isAdmin: [false],
      },
      {
        validators: CustomValidators.mustMatch('password', 'confirmPassword'),
      });

    this.educationFormGroup = formBuilder.group(
      {
        education: this.formBuilder.array([]),
      });
  }

  public async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEditMode = true;
      try {
        this.user = await this.userDataService.getUserDataById(this.id);
      } catch (e) {
        this.toastr.error(this.translate.instant('CREATE-EDIT.FORM.messages.notFound'));
        this.router.navigate(['/']);
        return;
      }

      this.user.educationData.forEach((data) => {
        this.getEducationFormsArray.push(this.createForm(data));
      });

      this.dataForm.get('name')?.setValue(this.user.name);
      this.dataForm.get('surname')?.setValue(this.user.surname);
      this.dataForm.get('email')?.setValue(this.user.email);
      this.dataForm.get('isAdmin')?.setValue(this.user.isAdmin);

      this.dataForm.get('password')?.setValidators([Validators.minLength(8), CustomValidators.password]);
      this.dataForm.get('password')?.updateValueAndValidity();
      this.dataForm.get('confirmPassword')?.setValidators([]);
      this.dataForm.get('confirmPassword')?.updateValueAndValidity();
      this.dataForm.get('avatar')?.setValidators([]);
      this.dataForm.get('avatar')?.updateValueAndValidity();
    } else {
      this.addRow();
    }
  }

  public addRow() {
    const rows = this.getEducationFormsArray;
    const fg = this.createForm();
    fg.markAsUntouched();
    fg.updateValueAndValidity();
    rows.push(fg);
  }

  public next() {
    this.dataForm.get('avatar')?.markAsTouched();
  }

  private createForm(data?: EducationData) {
    return this.formBuilder.group(
      {
        id: data?.id ?? '',
        school: [data?.school ?? '', [Validators.required]],
        degree: [data?.degree ?? '', [Validators.required]],
        fieldOfStudy: [data?.fieldOfStudy ?? '', [Validators.required]],
        startDate: [data?.startDate ? moment(data?.startDate) : moment(), [Validators.required]],
        endDate: [data?.startDate ? moment(data?.endDate) : moment(), [Validators.required]],
        grade: [data?.grade ?? '', [Validators.required]],
      },
      {
        validators: CustomValidators.isAfter('startDate', 'endDate'),
      });
  }

  public deleteForm(index: number) {
    const form = this.getEducationFormsArray;
    form.controls.splice(index, 1);
    form.updateValueAndValidity();
  }

  public async save() {
    this.dataForm.markAsTouched();
    const edForm = this.getEducationFormsArray;
    edForm.markAsTouched();
    if (!this.dataForm.valid || !edForm.valid) {
      return;
    }
    const edData: EducationData[] = [];
    let res;
    if (!this.isEditMode) {
      if (edForm.length !== 0) {
        edForm.controls.forEach((form) => {
          edData.push(
            {
              school: form.get('school')!.value,
              degree: form.get('degree')!.value,
              fieldOfStudy: form.get('fieldOfStudy')!.value,
              grade: form.get('grade')!.value,
              startDate: form.get('startDate')!.value,
              endDate: form.get('endDate')!.value,
            },
          );
        });
      }

      res = await this.userDataService.createUser({
        name: this.dataForm.get('name')!.value,
        surname: this.dataForm.get('surname')!.value,
        email: this.dataForm.get('email')!.value,
        password: this.dataForm.get('password')!.value,
        isAdmin: this.dataForm.get('isAdmin')!.value,
        avatar: this.selectedAvatar,
        educationData: edData,
      });
    } else {
      edForm.controls.forEach((form) => {
        edData.push(
          {
            id: form.get('id')!.value,
            school: form.get('school')!.value,
            degree: form.get('degree')!.value,
            fieldOfStudy: form.get('fieldOfStudy')!.value,
            grade: form.get('grade')!.value,
            startDate: form.get('startDate')!.value,
            endDate: form.get('endDate')!.value,
          },
        );
      });

      res = await this.userDataService.updateUserData({
        id: this.user.id,
        name: this.dataForm.get('name')!.value,
        surname: this.dataForm.get('surname')!.value,
        email: this.dataForm.get('email')!.value,
        password: this.dataForm.get('password')!.value ?? '',
        isAdmin: this.dataForm.get('isAdmin')!.value,
        avatar: this.selectedAvatar ?? '',
        educationData: edData,
      });
    }

    if (res?.success) {
      this.toastr.success(this.translate.instant('CREATE-EDIT.FORM.messages.success'));
      this.router.navigate(['/']);
    } else {
      this.toastr.error(this.translate.instant('CREATE-EDIT.FORM.messages.err'));
    }
  }

  public chosenYearHandler(normalizedYear: Moment, index: number, fieldName: string) {
    const ctrlValue = this.getEducationFormsArray.controls[index].get(fieldName)?.value;
    ctrlValue?.year(normalizedYear.year());
    this.getEducationFormsArray.controls[index].get(fieldName)?.setValue(ctrlValue);
  }

  public chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index: number, fieldName: string) {
    const ctrlValue = this.getEducationFormsArray.controls[index].get(fieldName)?.value;
    ctrlValue.month(normalizedMonth.month());
    this.getEducationFormsArray.controls[index].get(fieldName)?.setValue(ctrlValue);
    datepicker.close();
  }

  public async onFileSelected(event: any) {
    const files = event.target?.files;
    if (!files?.length) {
      return;
    }
    const selectedImage: File = files[0];

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };
    let compressedFile = selectedImage;

    try {
      compressedFile = await imageCompression(selectedImage, options);
    } catch (error) {
      this.toastr.error(this.translate.instant('CREATE-EDIT.FORM.avatarInput.err'));
      return;
    }
    this.selectedAvatar = await this.toBase64(compressedFile);
  }

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result!.toString());
      };
    });
  }

}
