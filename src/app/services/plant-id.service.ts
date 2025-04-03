import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { PlantID, PlantIDRequest } from '../models/plant-id.model';

@Injectable({
  providedIn: 'root',
})
export class PlantIDService extends BaseApiService {
  constructor(private http: HttpClient) {
    super(http, 'PlantID');
  }

  public identify(plantID: PlantIDRequest): Observable<PlantID> {
    const formData = new FormData();
    for (let file of plantID.files) {
      formData.append('file', file, file.name);
    }
    formData.append('organ', plantID.organ);

    return this.post<PlantID>('Search', formData);
  }
}
