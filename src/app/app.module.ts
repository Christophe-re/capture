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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LinkButtonComponent } from './link-button/link-button.component';
import { DetailCaptureModalComponent } from './detail-capture-modal/detail-capture-modal.component';
import { MatDialogModule } from '@angular/material';
import { LoadingService } from './services/loading.service';
@NgModule({
  declarations: [
    AppComponent,
    CapacitorComponent,
    MediadeviceComponent,
    InputdirectComponent,
    HomeComponent,
    LinkButtonComponent,
    DetailCaptureModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToasterModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot([
    //  { path: '',   redirectTo: '/inputdirect', pathMatch: 'full' },
      { path: 'mediadevice', component: MediadeviceComponent },
      { path: 'inputdirect', component: InputdirectComponent },
    ]),
    ImageCropperModule
  ],
  providers: [OcrService, GlobalToasterService, LoadingService],
  bootstrap: [AppComponent],
  entryComponents: [LinkButtonComponent, DetailCaptureModalComponent]
})
export class AppModule { }
