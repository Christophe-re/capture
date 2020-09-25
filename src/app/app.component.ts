import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationPosition, Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Subscription, timer } from 'rxjs';
import { GlobalToasterService } from './services/global-toaster.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('splashcreen', { static: true }) splashcreen: ElementRef;
  url: string;
  subTimer: Subscription;
  source = timer(1000, 2000);
  public config: ToasterConfig = new ToasterConfig({
    animation: 'fade',
    positionClass: 'toast-top-right',
    newestOnTop: false,
    timeout: 10000,
    showCloseButton: true,
    tapToDismiss: false
  });
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private toasterService: ToasterService,
    private globalToasterService: GlobalToasterService, ) {}

  ngOnInit() {
  this.router.navigate(['']);
  this.subTimer = this.source.subscribe(val => {
    if (val === 1) {
      this.renderer.setStyle(this.splashcreen.nativeElement, 'display',  'none');
      this.renderer.setStyle(this.splashcreen.nativeElement, 'visibility',  'hidden');
    }
  });
  this.globalToasterService.getToast().subscribe(toast => {
    this.toasterService.pop(toast);
  });
  }


  ngOnDestroy(): void {
    this.subTimer.unsubscribe();
  }

}
