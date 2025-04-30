import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { PlantIDImageResult, PlantIDImageRequest, PlantIDSearchResult } from '../models/plant/plant-id.model';
import { Plant } from '../models/plant/plant.model';
import { PaginatedResult } from '../models/paginated-result.model';

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

  public identifyByImage(plantID: PlantIDImageRequest): Observable<PlantIDImageResult[]> {
    const formData = new FormData();
    plantID.files.forEach((value: File) => {
      formData.append('Files', value);
    });
    formData.append('Organ', plantID.organ);

    return this.post<PlantIDImageResult[]>('Identify', formData);
  }

  public identifyByName(
    species: string,
    currentPage: number = 1,
    pageSize: number = 10,
  ): Observable<PaginatedResult<PlantIDSearchResult>> {
    const params = new HttpParams().set('page', currentPage.toString()).set('pageSize', pageSize.toString());
    return this.get<PaginatedResult<PlantIDSearchResult>>(`Identify/${encodeURIComponent(species)}`, params);
  }
}
