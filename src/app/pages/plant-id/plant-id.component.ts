import { Component, effect, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlantIDService } from '../../services/plant-id.service';
import {
  PlantIDImageResult,
  PlantIDImageRequest,
  PlantIDSearchResult,
  PlantID,
} from '../../models/plant/plant-id.model';
import { debounceTime, filter, map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { PlantIdResultsComponent } from '../../components/plant-id-results/plant-id-results.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PaginatedResult } from '../../models/paginated-result.model';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-plant-id',
  imports: [
    FormsModule,
    InfiniteScrollDirective,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    PlantIdResultsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './plant-id.component.html',
  styleUrl: './plant-id.component.scss',
})
export class PlantIDComponent implements OnDestroy {
  public plantIDSignal = signal<PlantID[]>([]);
  public plantIDImageResultSignal = signal<PlantIDImageResult[]>([]);
  public plantIDSearchResultSignal = signal<PlantIDSearchResult[]>([]);
  public searchQuery: string = '';
  public selectedFile: File | null = null;
  public selectedImage: string = '';

  private currentPage: number = 1;
  private paginatedResult: PaginatedResult<PlantIDSearchResult> | null = null;
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
          tap(() => {
            this.selectedFile = null;
            this.selectedImage = '';
            this.plantIDImageResultSignal.set([]);
          }), // reset all fields + data before searching
          switchMap((value: string) => this.identifyByName(value)), // pipe searchTerm to observable returning search results
        )
        .subscribe(),
    );
  }

  public get plantIDs(): PlantID[] {
    return this.plantIDSignal();
  }

  public get plantIDImageResults(): PlantIDImageResult[] {
    return this.plantIDImageResultSignal();
  }

  public get plantIDSearchResults(): PlantIDSearchResult[] {
    return this.plantIDSearchResultSignal();
  }

  public get totalItems(): number {
    return this.paginatedResult?.totalItems ?? 0;
  }

  public get totalPages(): number {
    return this.paginatedResult?.totalPages ?? 0;
  }

  //#region Lifecycle

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //#endregion

  //#region Events

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.readFile(file);
    }
  }

  public onPlantIDClick(plantID: PlantIDImageResult): void {
    this.navigate(plantID.species?.scientificNameWithoutAuthor ?? '');
  }

  public onPlantIDSearchResultClick(plantIDSearchResult: PlantIDSearchResult): void {
    this.navigate(plantIDSearchResult.scientificName);
  }

  public onRemoveClick(): void {
    this.selectedFile = null;
    this.selectedImage = '';
    this.plantIDImageResultSignal.set([]);
  }

  public onScroll(): void {
    if (this.searchQuery) {
      this.currentPage++;
      this.onSearch();
    }
  }

  public onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  public onImageSearchResult = effect(() => {
    const plantIDImageResults = this.plantIDImageResultSignal();
    const mappedResults = plantIDImageResults.map((value: PlantIDImageResult) => {
      return {
        scientificName: value.species?.scientificNameWithoutAuthor ?? '',
        commonNames: value.species?.commonNames ?? [],
        images: value.images ?? [],
        score: value.score,
      } as PlantID;
    });
    this.plantIDSignal.update((value) => value.concat(mappedResults));
  });

  public onSearchResult = effect(() => {
    const searchResults = this.plantIDSearchResultSignal();
    const mappedResults = searchResults.map((value: PlantIDSearchResult) => {
      return {
        scientificName: value.scientificName,
        commonNames: value.commonNames,
        images: value.images,
        score: 0,
      } as PlantID;
    });
    this.plantIDSignal.update((value) => value.concat(mappedResults));
  });

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

  private handleFileSelect(): void {
    if (this.selectedFile) {
      const plantID: PlantIDImageRequest = new PlantIDImageRequest([this.selectedFile], 'flower');
      this.plantIDService
        .identifyByImage(plantID)
        .pipe(
          tap((plantID: PlantIDImageResult[]) => {
            this.plantIDImageResultSignal.set(plantID);
          }),
        )
        .subscribe();
    }
  }

  private identifyByName(searchTerm: string): Observable<PaginatedResult<PlantIDSearchResult>> {
    return this.plantIDService.identifyByName(searchTerm, this.currentPage).pipe(
      tap((value: PaginatedResult<PlantIDSearchResult>) => {
        this.paginatedResult = value;
        this.plantIDSearchResultSignal.set(value.items);
      }),
    );
  }

  private navigate(scientificName: string): void {
    this.router.navigate(['plant', scientificName]);
  }

  private readFile(file: File): void {
    this.searchQuery = '';
    this.plantIDSearchResultSignal.set([]);

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.selectedFile = file;
    this.handleFileSelect();
  }
}
