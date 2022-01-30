import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternationalizationModule } from './core/internationalization/internationalization.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { JsonDateInterceptor } from './core/interceptors/json-date.interceptor';
import { FrameComponent } from './components/frame/frame.component';
import { FooterComponent } from './components/frame/footer/footer.component';
import { HeaderComponent } from './components/frame/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InternationalizationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
