import { ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';
import { IndoorWateringScheduleRequest } from '../models/indoor-watering-schedule.model';
import { Injectable } from '@angular/core';
import { WateringScheduleService } from '../services/watering-schedule.service';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WateringScheduleSuggestionResolver implements Resolve<IndoorWateringScheduleRequest> {
  private cache = new Map<string, IndoorWateringScheduleRequest>();

  constructor(private wateringScheduleService: WateringScheduleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IndoorWateringScheduleRequest> {
    const name = route.paramMap.get('name');
    if (!name) {
      return EMPTY;
    }

    const cachedValue: IndoorWateringScheduleRequest | undefined = this.cache.get(name.toLowerCase());
    if (cachedValue) {
      return of(cachedValue);
    }

    return this.wateringScheduleService.getSuggested(name).pipe(
      tap((value: IndoorWateringScheduleRequest) => {
        if (value) {
          this.cache.set(name.toLowerCase(), value);
        }
      }),
      catchError(() => {
        return EMPTY;
      }),
    );
  }
}
