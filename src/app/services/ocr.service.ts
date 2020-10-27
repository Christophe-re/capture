import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import {map, catchError} from 'rxjs/operators';
import { base64ToFile } from 'ngx-image-cropper';
import { BodyOutputType } from 'angular2-toaster';
import { LinkButtonComponent } from '../link-button/link-button.component';
import { GlobalToasterService } from './global-toaster.service';
import { LoadingService } from './loading.service';
@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private http: HttpClient, private globalToasterService: GlobalToasterService, private loadingService: LoadingService) { }

  private baseUrl = environment.backend.baseURL;
  private endPoint = 'dev/in-tact/v1.0/ocr?key=FT3W8J1LXZ88';
  public listCapture = [];

  manageOCR(image) {
    this.loadingService.setLoading();
    const startTimestamp = new Date().getTime();
    this.postOCR(image).subscribe(
      (val) => {
        const endTimestamp: number = new Date().getTime();
        const responseTimes = endTimestamp - startTimestamp;
        this.loadingService.unsetLoading();
        console.log('POST call successful value returned in body', val);
        let title: string;
        let status: string;
        if (val && val.statut) {
          if (val.statut === 1) {
            title = 'Information(s) manquante(s)';
            status = 'info';
            this.listCapture.push({
              responseTimes: responseTimes,
              response: val,
              image: image,
              title: title,
              status: status,
            });
          } else if (val.statut === 2) {
            title = 'Prix différent';
            status = 'error';
            this.listCapture.push({
              responseTimes: responseTimes,
              response: val,
              image: image,
              title: title,
              status: status,
            });
          } else if (val.statut === 3) {
            status = 'warning';
            title = 'Information(s) incorrecte(s)';
            this.listCapture.push({
              responseTimes: responseTimes,
              response: val,
              image: image,
              title: title,
              status: status,
            });
          } else if (val.statut === 4) {
            title = 'Prix correct';
            status = 'success';

          } else {
            title = 'Erreur Inconnue';
            status = 'unknown';
          }
        }
        this.globalToasterService.setToast({
          type: status,
          title: title,
          body: LinkButtonComponent,
          bodyOutputType: BodyOutputType.Component,
          data: {
            responseTimes: responseTimes,
            response: val,
            image: image,
            title: title,
            status: status,
          }
        });
      },
      response => {
        this.loadingService.unsetLoading();
        console.log('POST call in error', response);
        this.globalToasterService.setToast({
          type: 'error',
          title: 'Erreur serveur',
          body: response,
        });
        this.listCapture.push({
          response: {},
          image: image,
          title: 'Erreur Serveur',
          status: 'error',
        });
      },
      () => {
        this.loadingService.unsetLoading();
        console.log('The POST observable is now completed.');
      }
    );
  }

  postOCR(image: string): Observable<any>{
    const file = base64ToFile(image);
    const formData = new FormData();
    formData.append('upload', file);
   // return of({statut: 1, test:['aa', 'bb'] });
    return this.http.post<FormData>(`${this.baseUrl}/${this.endPoint}`, formData)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
