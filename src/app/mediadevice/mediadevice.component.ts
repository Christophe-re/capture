import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CameraResultType, Camera, Filesystem, FilesystemDirectory, Capacitor } from '@capacitor/core';

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
            facingMode: "environment",
            // width: { ideal: 1024 },
            // height: { ideal: 540 }
        }
    };
    stream;


    constructor(private renderer: Renderer2) {
      window['titi']=this;
    }

    ngOnInit() {
      this.startCamera();
    }

    ngOnDestroy(): void {
      this.stopCamera();
    }

    startCamera() {
        if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
        } else {
            alert('Sorry, camera not available.');
        }
    }

    attachVideo(stream) {
        this.stream = stream;
        this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
        this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
            this.videoHeight = this.videoElement.nativeElement.videoHeight ;
            this.videoWidth = this.videoElement.nativeElement.videoWidth ;
            this.selectionHeight = this.videoElement.nativeElement.offsetHeight * 0.666 ;
            // this.selectionHeight = this.videoElement.nativeElement.offsetHeight / 2 ;
            this.selectionWidth = this.videoElement.nativeElement.offsetWidth * 0.8 ;
            this.renderer.setStyle(this.selection.nativeElement, 'width',  this. selectionWidth + 'px');
            this.renderer.setStyle(this.selection.nativeElement, 'height', this.selectionHeight + 'px' );
        });

    }

    async capture() {
      // const sx = (this.videoElement.nativeElement.offsetWidth * 0.2) / 2 ;
      // const sy =  (this.videoElement.nativeElement.offsetHeight * 0.333) / 2;      
      const sx = this.videoWidth * 0.1;

      const sy = (this.videoHeight * 0.333) / 2;
      const swidth = this.videoWidth * 0.8;
      const sheight = this.videoHeight * 0.666;
      const x = 0;
      const y = 0;
      const width = this.videoWidth * 0.8;
      const height = this.videoHeight * 0.666;

      this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth * 0.8);
      this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight * 0.666);

      console.log(this.videoElement.nativeElement.offsetHeight / 2);

      this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, sx , sy, swidth, sheight,  x, y, width, height);

      const date = new Date();
      const time = date.getTime();
      const fileName = 'image' + time + '.jpeg';
      const link = document.createElement('a');
      link.download = fileName + '.jpeg';
      link.href = this.canvas.nativeElement.toDataURL('image/jpeg', 1.0).replace('image/jpeg', 'image/octet-stream');
      link.click();

    }

    stopCamera(reset?: boolean) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
      if (reset) {
        this.startCamera();
      }
    }

    handleError(error) {
        console.log('Error: ', error);
    }
    
}
