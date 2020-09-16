import { Component, OnInit } from '@angular/core';
import { Filesystem, FilesystemDirectory, Capacitor } from '@capacitor/core';
import { ImageTransform, ImageCroppedEvent, base64ToFile, Dimensions } from 'ngx-image-cropper';

@Component({
  selector: 'app-inputdirect',
  templateUrl: './inputdirect.component.html',
  styleUrls: ['./inputdirect.component.scss']
})

export class InputdirectComponent  {

  constructor() { }
  imgB64;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  cropper = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  };

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void  {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
  }

  imageLoaded(): void  {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions): void  {
    console.log('Cropper ready', sourceImageDimensions);
    this.cropper = {
      x1: 0,
      x2: sourceImageDimensions.width ,
      y1: sourceImageDimensions.height / 3,
      y2: (sourceImageDimensions.height / 3) * 2
    };
  }

  loadImageFailed(): void  {
    console.log('Load failed');
  }

  rotateLeft(): void  {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight(): void  {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate(): void  {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
  }

  flipHorizontal(): void  {
    this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH
    };
  }

  flipVertical(): void  {
    this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV
    };
  }

  resetImage(): void  {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut(): void  {
    this.scale -= .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  zoomIn(): void  {
    this.scale += .1;
    this.transform = {
        ...this.transform,
        scale: this.scale
    };
  }

  toggleContainWithinAspectRatio(): void  {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation(): void  {
    this.transform = {
        ...this.transform,
        rotate: this.rotation
    };
  }

  save(): void  {
    const date = new Date();
    const time = date.getTime();
    const fileName = 'image' + time + '.jpeg';
   // const contentType = 'image/jpeg';
  //  const linkSource = `data:${contentType};base64,${this.croppedImage}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = this.croppedImage;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
