import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading: boolean = false;
  constructor() { }
  public setLoading(): void {
    this.isLoading = true;
  }

  public unsetLoading(): void {
    this.isLoading = false;
  }
}
