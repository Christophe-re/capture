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
@NgModule({
  declarations: [
    AppComponent,
    CapacitorComponent,
    MediadeviceComponent,
    InputdirectComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
        RouterModule.forRoot([
      { path: '',   redirectTo: '/mediadevice', pathMatch: 'full' },
      { path: 'mediadevice', component: MediadeviceComponent },
      { path: 'inputdirect', component: InputdirectComponent },
    ]),
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
