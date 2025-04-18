import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { Plant } from '../models/plant.model';
import { PlantIDService } from '../services/plant-id.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlantResolver implements Resolve<Plant> {
  private cache = new Map<string, Plant>();

  constructor(private plantIDService: PlantIDService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Plant> {
    const name = route.paramMap.get('name');
    if (!name) {
      return EMPTY;
    }

    const cachedPlant: Plant | undefined = this.cache.get(name.toLowerCase());
    if (cachedPlant) {
      return of(cachedPlant);
    }

    return this.plantIDService.search(name).pipe(
      tap((value: Plant) => {
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
