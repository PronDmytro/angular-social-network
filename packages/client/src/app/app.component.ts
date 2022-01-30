import { Component } from '@angular/core';
import { LanguageService } from './core/internationalization/language.service';
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public spinner: string;

  public constructor(
    public translate: LanguageService,
  ) {
    this.spinner = Spinkit.skWanderingCubes;
  }

}
