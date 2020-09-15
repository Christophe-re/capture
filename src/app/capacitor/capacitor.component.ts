import { Component, OnInit } from '@angular/core';
import { GeolocationPosition, Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-capacitor',
  templateUrl: './capacitor.component.html',
  styleUrls: ['./capacitor.component.scss']
})
export class CapacitorComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }
  ngOnInit() {
  }

  async takePicture() {
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 100,
      allowEditing: true,
      correctOrientation: true,
      saveToGallery: true,
    });
    this.imageChangedEvent = image;
    console.log(image);
  }




}
