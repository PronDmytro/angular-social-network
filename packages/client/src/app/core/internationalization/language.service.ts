import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  public constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
  ) {
    translateService.addLangs(['en', 'fr']);
    translateService.setDefaultLang('en');
    translateService.use(localStorageService.getItem('lng'));
    console.log(localStorageService.getItem('lng'));
  }

  public getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  public setLang(lng: string) {
    this.translateService.use(lng);
    this.localStorageService.setItem('lng', lng);
  }

  public getLangs(): string[] {
    return this.translateService.langs;
  }

}
