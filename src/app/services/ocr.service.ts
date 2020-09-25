import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
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

  baseUrl = environment.backend.baseURL;
  endPoint = 'dev/in-tact/v1.0/ocr';

  manageOCR(image) {
    this.loadingService.setLoading()
    this.postOCR(image).subscribe(
      (val) => {
        this.loadingService.unsetLoading();
        console.log('POST call successful value returned in body', val);
        this.globalToasterService.setToast({
          type: 'success',
         // title: 'success',
          body: LinkButtonComponent,
          bodyOutputType: BodyOutputType.Component,
          data: {
            response: val,
            image: image,
            title: 'Opération réalisée avec succès',
          }
        });
      },
      response => {
        this.loadingService.unsetLoading();
        console.log('POST call in error', response);

        this.globalToasterService.setToast({
          type: 'error',
          title: 'Error',
          body: response,
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
