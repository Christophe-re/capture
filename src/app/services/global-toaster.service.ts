import {Injectable} from '@angular/core';
import {Toast} from 'angular2-toaster';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalToasterService {

  private _toastEmit = new Subject<Toast>();
  private _toastToDeleteEmit = new Subject<Toast>();

  constructor() {}

  setToast(toast: Toast): void {
    this._toastEmit.next(toast);
  }

  deleteToast(toast: Toast): void {
    this._toastToDeleteEmit.next(toast);
  }

  getToast(): Observable<Toast> {
    return this._toastEmit.asObservable();
  }

  removeToast(): Observable<Toast> {
    return this._toastToDeleteEmit.asObservable();
  }
}
