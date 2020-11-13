import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged = false;
  public agencyCode = undefined;
  private baseUrl = environment.backend.baseURL;
  private endPoint = '/dev/sgdbf/v1.0/agences/';
  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  public userIsLogged() {
    return this.getWithExpiry('authentication');
  }

  public setAgencyCode(code?) {
    if (code) {
      this.agencyCode = code;
    } else {
      this.agencyCode = this.getWithExpiry('code');
    }
  }

  public async getLoggin(code: string): Promise<boolean> {
    this.loadingService.setLoading();
    return new Promise((resolve, reject) => {
      this.postLoggin(code).subscribe(
        val => {
          console.log('vel', val);
          if (val === 1) {
            localStorage.setItem('authentication', JSON.stringify({ value: true, expiry: new Date().getTime() + 1800000 }));
            localStorage.setItem('code', JSON.stringify({ value: code, expiry: new Date().getTime() + 1800000 }));
            this.agencyCode = code;
            this.loadingService.unsetLoading();
            resolve(true);
          } else {
            this.loadingService.unsetLoading();
            resolve(false);
          }
        },
        response => {
          this.loadingService.unsetLoading();
          resolve(false);
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
    });
  }

  private postLoggin(codeAgency: string): Observable<any> {
 //  return of(1);
    return this.http.post(`${this.baseUrl}${this.endPoint}${codeAgency}?key=FT3W8J1LXZ88`, null).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  public getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}
