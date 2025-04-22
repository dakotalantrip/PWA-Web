import { Component, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlantIDService } from '../../services/plant-id.service';
import { PlantID, PlantIDImageRequest, PlantIDSearchResult } from '../../models/plant-id.model';
import { debounceTime, filter, map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { PlantIdResultsComponent } from '../../components/plant-id-results/plant-id-results.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PlantIdSearchResultsComponent } from '../../components/plant-id-search-results/plant-id-search-results.component';

@Component({
  selector: 'app-plant-id',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    PlantIdResultsComponent,
    PlantIdSearchResultsComponent,
  ],
  templateUrl: './plant-id.component.html',
  styleUrl: './plant-id.component.scss',
})
export class PlantIDComponent implements OnDestroy {
  public plantIDSignal = signal<PlantID[]>([]);
  public plantIDSearchResultSignal = signal<PlantIDSearchResult[]>([]);
  public searchQuery: string = '';
  public selectedFile: File | null = null;
  public selectedImage: string = '';

  private searchSubject: Subject<string> = new Subject<string>();
  private subscription: Subscription = new Subscription();

  constructor(
    private plantIDService: PlantIDService,
    private router: Router,
  ) {
    this.subscription.add(
      this.searchSubject
        .pipe(
          debounceTime(600),
          map((value) => value?.trim()), // remove extra whitespace
          filter((value): value is string => !!value), // filter out empty or undefined/null
          switchMap((value: string) => this.identifyByName(value)), // pipe searchTerm to observable returning search results
        )
        .subscribe(),
    );
  }

  public get plantIDs(): PlantID[] {
    return this.plantIDSignal();
  }

  public get plantIDSearchResults(): PlantIDSearchResult[] {
    return this.plantIDSearchResultSignal();
  }

  //#region Lifecycle

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //#endregion

  //#region Events

  private handleFileSelect(): void {
    if (this.selectedFile) {
      const plantID: PlantIDImageRequest = new PlantIDImageRequest([this.selectedFile], 'flower');
      this.plantIDService
        .identifyByImage(plantID)
        .pipe(
          tap((plantID: PlantID[]) => {
            this.plantIDSearchResultSignal.set([]);
            this.plantIDSignal.set(plantID);
          }),
        )
        .subscribe();
    }
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.readFile(file);
    }
  }

  public onPlantIDClick(plantID: PlantID): void {
    this.navigate(plantID.species?.scientificNameWithoutAuthor ?? '');
  }

  public onPlantIDSearchResultClick(plantIDSearchResult: PlantIDSearchResult): void {
    this.navigate(plantIDSearchResult.scientificName);
  }

  public onRemoveClick(): void {
    this.selectedFile = null;
    this.selectedImage = '';
    this.plantIDSignal.set([]);
  }

  public onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  public onTakePhoto(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // use 'user' for front camera
    input.onchange = (event: Event) => {
      const file = (input as HTMLInputElement).files?.[0];
      if (file) {
        this.readFile(file);
      }
    };
    input.click();
  }

  //#endregion

  private identifyByName(searchTerm: string): Observable<PlantIDSearchResult[]> {
    return this.plantIDService.identifyByName(searchTerm).pipe(
      tap((value: PlantIDSearchResult[]) => {
        this.onRemoveClick();
        this.plantIDSearchResultSignal.set(value);
      }),
    );
  }

  private navigate(scientificName: string): void {
    this.router.navigate(['plant', scientificName]);
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.selectedFile = file;
    this.handleFileSelect();
  }
}
