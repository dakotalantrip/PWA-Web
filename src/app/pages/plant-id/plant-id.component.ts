import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlantIDService } from '../../services/plant-id.service';
import { PlantIDSpecies, PlantID, PlantIDRequest } from '../../models/plant-id.model';
import { finalize, tap } from 'rxjs';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-plant-id',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './plant-id.component.html',
  styleUrl: './plant-id.component.scss',
})
export class PlantIDComponent {
  public imagePreviews: string[] = [];
  public isLoading: boolean = false;
  public selectedFiles: File[] = [];
  public plantIDSignal = signal<PlantID[] | null>(null);
  public plantsSignal = signal<Plant[] | null>(null);

  constructor(private plantIDService: PlantIDService) {}

  public get plantIDs(): PlantID[] | null {
    return this.plantIDSignal();
  }

  public get plants(): Plant[] | null {
    return this.plantsSignal();
  }

  //#region Events

  private handleFileSelect(): void {
    if (this.selectedFiles.length) {
      this.isLoading = true;
      const plantID: PlantIDRequest = new PlantIDRequest(this.selectedFiles, 'flower');
      this.plantIDService
        .identify(plantID)
        .pipe(
          tap((plantID: PlantID[]) => {
            this.plantIDSignal.set(plantID);
          }),
          finalize(() => (this.isLoading = false)),
        )
        .subscribe();
    }
  }

  public onClearClick(): void {
    this.imagePreviews = [];
    this.selectedFiles = [];
    this.plantIDSignal.set(null);
    this.plantsSignal.set(null);
  }

  public onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  public onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      for (let file of files) {
        this.selectedFiles.push(file);
        this.previewImage(file);
      }
      this.handleFileSelect();
    }
  }

  public onSpeciesClick(species: PlantIDSpecies): void {
    this.plantIDService
      .search(species.scientificNameWithoutAuthor ?? '')
      .pipe(tap((result: Plant[]) => this.plantsSignal.set(result)))
      .subscribe();
  }

  //#endregion

  public getScorePercent(score: number): string {
    return Math.ceil(score * 100).toString();
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviews.push(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
}
