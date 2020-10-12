import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationPosition, Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { Subscription, timer } from 'rxjs';
import { GlobalToasterService } from './services/global-toaster.service';
import { LoadingService } from './services/loading.service';
import { environment } from 'src/environments/environment';
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
    timeout: 5000,
    showCloseButton: true,
    tapToDismiss: false
  });
  private frontBaseUrl = environment.front.baseURL;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private toasterService: ToasterService,
    private globalToasterService: GlobalToasterService,
    public loadingService: LoadingService ) {}

  ngOnInit() {
    this.loadingService.unsetLoading()
    this.router.navigate([this.frontBaseUrl]);
    this.subTimer = this.source.subscribe(val => {
      if (val === 1) {
        this.renderer.setStyle(this.splashcreen.nativeElement, 'display',  'none');
        this.renderer.setStyle(this.splashcreen.nativeElement, 'visibility',  'hidden');
        this.router.navigate(['/inputdirect']);
        this.subTimer.unsubscribe();

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
