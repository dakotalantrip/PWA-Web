import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount: number = 0;
  private _loading = new BehaviorSubject<boolean>(false);

  public readonly loading$ = this._loading.asObservable();

  public show(): void {
    this.loadingCount++;
    this._loading.next(true);
  }

  public hide(): void {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) {
      this._loading.next(false);
    }
  }
}
