import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CameraResultType, Camera, Filesystem, FilesystemDirectory, Capacitor } from '@capacitor/core';
import { BodyOutputType } from 'angular2-toaster';
import {  base64ToFile } from 'ngx-image-cropper';
import { LinkButtonComponent } from '../link-button/link-button.component';
import { GlobalToasterService } from '../services/global-toaster.service';
import { OcrService } from '../services/ocr.service';
@Component({
  selector: 'app-mediadevice',
  templateUrl: './mediadevice.component.html',
  styleUrls: ['./mediadevice.component.scss']
})
export class MediadeviceComponent implements OnInit, OnDestroy{

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('selection', { static: true }) selection: ElementRef;

  videoWidth = 0;
  videoHeight = 0;
  selectionHeight;
  selectionWidth;
  constraints = {
      video: {
          facingMode: 'environment',
          // width: { ideal: 1024 },
          // height: { ideal: 540 }
      }
  };
  imageCaptureConfig = {
      fillLightMode: "flash", /* or "flash" */
      focusMode: "continuous"
  };

  stream;
  activateSaveButton = false;
  isLandscapeMode: boolean;
  isFlashEnabled =false;
  imgCap;

  constructor(private renderer: Renderer2, private ocrService: OcrService, private globalToasterService: GlobalToasterService) {
    window.addEventListener('orientationchange', (event) => {
      this.stopCamera(true);
    }, false);
  }

  ngOnInit(): void {
    this.startCamera();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startCamera(): void {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
  }


  attachVideo(stream): void {
      this.stream = stream;
      this.imgCap = new ImageCapture(stream.getVideoTracks()[0]);
      const photoCapabilities = this.imgCap.getPhotoCapabilities().then((res) => { 
        console.log(res)
      });

      this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
      this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
        this.isLandscapeMode = window.innerWidth > window.innerHeight;

        this.videoHeight = this.videoElement.nativeElement.videoHeight ;
        this.videoWidth = this.videoElement.nativeElement.videoWidth ;
          // tslint:disable-next-line: max-line-length
        this.selectionHeight = this.isLandscapeMode ? this.videoElement.nativeElement.offsetHeight * 0.666  : this.videoElement.nativeElement.offsetHeight * 0.333;
        this.selectionWidth = this.videoElement.nativeElement.offsetWidth * 0.8 ;

        this.renderer.setStyle(this.selection.nativeElement, 'width',  this. selectionWidth + 'px');
        this.renderer.setStyle(this.selection.nativeElement, 'height', this.selectionHeight + 'px' );
      });

  }

  capture(): void {

    const sx = this.videoWidth * 0.1;

    const sy = this.isLandscapeMode ? (this.videoHeight * 0.333) / 2 : (this.videoHeight * 0.666) / 2;
    const swidth = this.videoWidth * 0.8;
    const sheight = this.isLandscapeMode ? this.videoHeight * 0.666 : this.videoHeight * 0.333;
    const x = 0;
    const y = 0;
    const width = this.videoWidth * 0.8;
    const height = this.isLandscapeMode ? this.videoHeight * 0.666 : this.videoHeight * 0.333 ;

    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth * 0.8);
    if (this.isLandscapeMode) {
      this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight * 0.666);
    } else {
      this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight * 0.333);
    }
    this.imgCap.takePhoto()
    .then(blob =>  {
      console.log(URL.createObjectURL(blob));
      const image = document.querySelector('img');
      image.src = URL.createObjectURL(blob);
      createImageBitmap(blob).then(imageBitmap => {
        this.canvas.nativeElement.getContext('2d').drawImage(imageBitmap, sx , sy, swidth, sheight,  x, y, width, height);
       // window.location.href = 'data:application/octet-stream;base64,' + '.img';
       // drawCanvas(canvas, imageBitmap);
      })
      .catch(error => console.log(error));
    });

   // this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, sx , sy, swidth, sheight,  x, y, width, height);
   // this.ocrService.manageOCR(this.canvas.nativeElement.toDataURL('image/jpeg', 1.0));

  }

  setlight(stream) {

    //Create image capture object and get camera capabilities
    const photoCapabilities = this.imgCap.getPhotoCapabilities().then((res) => {
      console.log(res)
      //todo: check if camera has a torch

      //let there be light!
      // const btn = document.querySelector('.switch');
      // btn.addEventListener('click', function(){
      //   track.applyConstraints({
      //     advanced: [{torch: true}]
      //   });
      // });
    });

    //Create image capture object and get camera capabilities
  }

  save() {
    const date = new Date();
    const time = date.getTime();
    const fileName = 'image' + time + '.jpeg';
    const link = document.createElement('a');
    link.download = fileName + '.jpeg';
    link.href = this.canvas.nativeElement.toDataURL('image/jpeg', 1.0).replace('image/jpeg', 'image/octet-stream');
    link.click();
   // this.onUpload()
  }

  stopCamera(reset?: boolean): void {
    this.stream.getTracks().forEach((track) => {
      track.stop();
    });
    if (reset) {
      this.startCamera();
    }
  }

  handleError(error): void {
      console.log('Error: ', error);
  }


}


