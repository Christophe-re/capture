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
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private http: HttpClient, private globalToasterService: GlobalToasterService, private loadingService: LoadingService) { }

  private baseUrl = environment.backend.baseURL;
  private endPoint = 'dev/sgdbf/v1.0/ocr?key=FT3W8J1LXZ88';
  public listCapture = [];

  manageOCR(image) {
    this.loadingService.setLoading();
    const startTimestamp = new Date().getTime();
    this.postOCR(image).subscribe(
      (val) => {
        const response = this.mapper(val);
        const endTimestamp: number = new Date().getTime();
        const responseTimes = endTimestamp - startTimestamp;
        this.loadingService.unsetLoading();
        console.log('POST call successful value returned in body', val);
        let title: string;
        let status: string;
        if (val && val.statut) {
          if (val.statut === 4) {
            title = 'Données manquantes (scan)';
            status = 'info';
            this.listCapture.push({
              responseTimes: responseTimes,
              response: response,
              image: image,
              title: title,
              status: status,
            });
          } else if (val.statut === 2) {
            title = 'Prix différent';
            status = 'error';
            this.listCapture.push({
              responseTimes: responseTimes,
              response: response,
              image: image,
              title: title,
              status: status,
            });
          } else if (val.statut === 3) {
            status = 'warning';
            title = 'Information(s) incorrecte(s)';
            this.listCapture.push({
              responseTimes: responseTimes,
              response: response,
              image: image,
              title: title,
              status: status,
            });
          } else if (val.statut === 1) {
            title = 'Prix correct';
            status = 'success';

          } else if (val.statut === 5) {
            title = 'Article inexistant en base de données';
            status = 'info';
            this.listCapture.push({
              responseTimes: responseTimes,
              response: response,
              image: image,
              title: title,
              status: status,
            });
          }else {
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
            response: response,
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
    // return of({
    //   id: 'f9617d0e-75d6-49a2-bc65-377b9014106f',
    //   code_produit: '6839273',
  
    //   code_zone: '980005',
    //   code_emplacement: '000020',
    //   code_ean_13: '3 388752 070371',
    //   prix_ht: '45,82',
    //   prix_ttc: '54,94',
    //   texts: 'we\ncare\nWeberepox easy gris acier 2,5kg,\nRéservé uniquement aux Pro, réf.\n980005 000020\n54,98P\nEUR TTC\n6839273 I\n08/PI\n17-07-2020 P\n45,82\nEUR HT\n3 388752070371\nwebe\n',
    //   statut: 3,
    //   invalid_fields: [
    //       {
    //           name: 'code_zone',
    //           value: 980006
    //       },
    //       {
    //           name: 'code_emplacement',
    //           value: '000030'
    //       }
    //     ]
    //   }
    // );
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

  mapper(val): any {
    return {
      infos: [
        {
          name: 'Code Produit',
          order: 1,
          scanReturn: val.code_produit || '-',
          validField: this.findInvalidFields('code_produit', val.invalid_fields)
        },
        {
          name: 'Code Dispo',
          order: 2,
          scanReturn: val.code_dispo || '-',
          validField: this.findInvalidFields('code_dispo', val.invalid_fields)
        },
        {
          name: 'Code Zone',
          order: 3,
          scanReturn: val.code_zone || '-',
          validField: this.findInvalidFields('code_zone', val.invalid_fields)
        },
        {
          name: 'Code Emplacement',
          order: 4,
          scanReturn: val.code_emplacement || '-',
          validField: this.findInvalidFields('code_emplacement', val.invalid_fields)
        },
        {
          name: 'Prix HT',
          order: 6,
          scanReturn: val.prix_ht || '-',
          validField: this.findInvalidFields('prix_ht', val.invalid_fields)
        },
        {
          name: 'Prix TTC',
          order: 7,
          scanReturn: val.prix_ttc || '-',
          validField: this.findInvalidFields('prix_ttc', val.invalid_fields)
        },
        {
          name: 'Code Ean 13',
          order: 5,
          scanReturn: val.code_ean_13 || '-',
          validField: this.findInvalidFields('code_ean_13', val.invalid_fields)
        },
        {
          name: 'Info Scans',
          order: 8,
          scanReturn: val.texts || '-',
          validField: this.findInvalidFields('texts', val.invalid_fields)
        },
      ],
      statut: val.status || '',
      id: val.id || ''
    };
  }

  findInvalidFields(name: string, invalidFields: {name: string, value: any }[]) {
    if (!invalidFields || !invalidFields.length) {
      return undefined;
    } else {
      return invalidFields.find(el => el.name === name) ? invalidFields.find(el => el.name === name).value : undefined ;
    }
  }
}
