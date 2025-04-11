import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { PlantID, PlantIDRequest } from '../models/plant-id.model';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root',
})
export class PlantIDService extends BaseApiService {
  constructor(private http: HttpClient) {
    super(http, 'PlantID');
  }

  public search(name: string): Observable<Plant> {
    return this.get<any>(`${name}`);
  }

  public identify(plantID: PlantIDRequest): Observable<PlantID[]> {
    const formData = new FormData();
    plantID.files.forEach((value: File) => {
      formData.append('Files', value);
    });
    formData.append('Organ', plantID.organ);

    return this.post<PlantID[]>('Identify', formData);
  }
}
