import {Injectable} from '@angular/core';
import {Toast} from 'angular2-toaster';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalToasterService {

  private _toastEmit = new Subject<Toast>();


  constructor() {}

  setToast(toast: Toast): void {
    this._toastEmit.next(toast);
  }

  getToast(): Observable<Toast> {
    return this._toastEmit.asObservable();
  }
}
