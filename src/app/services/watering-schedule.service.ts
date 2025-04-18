import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndoorWateringScheduleRequest } from '../models/indoor-watering-schedule.model';

@Injectable({
  providedIn: 'root',
})
export class WateringScheduleService extends BaseApiService {
  constructor(private http: HttpClient) {
    super(http, 'WateringSchedule');
  }

  public getSuggested(species: string): Observable<IndoorWateringScheduleRequest> {
    const formData = new FormData();
    return this.get<any>(species);
  }
}
