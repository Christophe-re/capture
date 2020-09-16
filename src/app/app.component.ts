import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GeolocationPosition, Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import { Subscription, timer } from 'rxjs';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('splashcreen', { static: true }) splashcreen: ElementRef;

  subTimer: Subscription;
  source = timer(1000, 2000);
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
  this.subTimer = this.source.subscribe(val => {
    if (val === 1) {
      this.renderer.setStyle(this.splashcreen.nativeElement, 'display',  'none');
      this.renderer.setStyle(this.splashcreen.nativeElement, 'visibility',  'hidden');
    }
  });
  }


  ngOnDestroy(): void {
    this.subTimer.unsubscribe();
  }

}
