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

  error;
  log;
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
      this.showCropper = true;
      console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
      console.log('Cropper ready', sourceImageDimensions);
      this.cropper = {
        x1: 0,
        x2: sourceImageDimensions.width ,
        y1: sourceImageDimensions.height / 3,
        y2: (sourceImageDimensions.height / 3) * 2
      };
  }

  loadImageFailed() {
      console.log('Load failed');
  }

  rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
  }

  rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
  }

  private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
          ...this.transform,
          flipH: flippedV,
          flipV: flippedH
      };
  }

  flipHorizontal() {
      this.transform = {
          ...this.transform,
          flipH: !this.transform.flipH
      };
  }

  flipVertical() {
      this.transform = {
          ...this.transform,
          flipV: !this.transform.flipV
      };
  }

  resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
  }

  zoomOut() {
      this.scale -= .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  zoomIn() {
      this.scale += .1;
      this.transform = {
          ...this.transform,
          scale: this.scale
      };
  }

  toggleContainWithinAspectRatio() {
      this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
      this.transform = {
          ...this.transform,
          rotate: this.rotation
      };
  }

async capture() {
  let date = new Date();
  let time = date.getTime();
  let fileName = time + ".jpeg";

  await Filesystem.writeFile({
  data: this.croppedImage ,
  path: fileName,
  directory: FilesystemDirectory.Data
});

  const finalPhotoUri = await Filesystem.getUri({
  directory: FilesystemDirectory.Data,
  path: fileName
});

  let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
  console.log(photoPath);
}

// Save picture to file on device
  save() {
   console.log(this.croppedImage);
    let date = new Date();
        let time = date.getTime();
        let fileName = "image" + time + ".jpeg";
        // const link = document.createElement('a');
        // link.download = fileName + '.jpeg';
        // console.log(this.croppedImage)
        // this.croppedImage.toBlob(function(blob) {
        //     console.log(blob)
        //     link.href = URL.createObjectURL(blob);
        //     link.click();
        // }, 'image/jpeg', 1);
    
        let contentType = 'image/jpeg';
      //  const linkSource = `data:${contentType};base64,${this.croppedImage}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = this.croppedImage;
        downloadLink.download = fileName;
        downloadLink.click();
    // let date = new Date(),
    // time = date.getTime(),
    // fileName = time + ".jpeg";

    // console.log(this.croppedImage)

       

    // Filesystem.writeFile({
    //   data: this.croppedImage,
    //   path: fileName,
    //   directory: FilesystemDirectory.Documents
    // }).then(
    //   () => {
    //     Filesystem.getUri({
    //       directory: FilesystemDirectory.Data,
    //       path: fileName
    //     }).then(
    //       result => {
    //         let path = Capacitor.convertFileSrc(result.uri);
    //         console.log(path);
    //         this.log = path;
    //       },
    //       err => {
    //         console.log(err);
    //         this.error = err;
    //       }
    //     );
    //   },
    //   err => {
    //     console.log(err);
    //     this.error = err;
    //   }
    // );

  }

}
