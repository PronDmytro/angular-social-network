import { Component } from '@angular/core';
import { LanguageService } from './core/internationalization/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public constructor(
    public translate: LanguageService,
  ) {
  }

}
