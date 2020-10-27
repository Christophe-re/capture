import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CapacitorComponent } from './capacitor/capacitor.component';
import { RouterModule } from '@angular/router';
import { MediadeviceComponent } from './mediadevice/mediadevice.component';
import { InputdirectComponent } from './inputdirect/inputdirect.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { OcrService } from './services/ocr.service';
import { GlobalToasterService } from './services/global-toaster.service';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LinkButtonComponent } from './link-button/link-button.component';
import { DetailCaptureModalComponent } from './detail-capture-modal/detail-capture-modal.component';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { LoadingService } from './services/loading.service';
import { ListCaptureComponent } from './list-capture/list-capture.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    CapacitorComponent,
    MediadeviceComponent,
    InputdirectComponent,
    HomeComponent,
    LinkButtonComponent,
    DetailCaptureModalComponent,
    ListCaptureComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    ImageCropperModule,
    ToasterModule.forRoot(),
    RouterModule.forRoot([
      { path: 'mediadevice', canActivate: [AuthGuardService], component: MediadeviceComponent },
      { path: 'inputdirect', canActivate: [AuthGuardService], component: InputdirectComponent },
      { path: 'listcapture', canActivate: [AuthGuardService], component: ListCaptureComponent },
      { path: 'login', component: LoginComponent },
    ], { useHash: true }),
  ],
  providers: [OcrService, GlobalToasterService, LoadingService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [LinkButtonComponent, DetailCaptureModalComponent]
})
export class AppModule { }
