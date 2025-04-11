import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlantIDService } from '../../services/plant-id.service';
import { PlantIDSpecies, PlantID, PlantIDRequest } from '../../models/plant-id.model';
import { finalize, switchMap, tap } from 'rxjs';
import { Plant } from '../../models/plant.model';
import { PlantIdResultsComponent } from '../../components/plant-id-results/plant-id-results.component';
import { MatDialog } from '@angular/material/dialog';
import { PlantIDDialogComponent } from '../../components/plant-id-dialog/plant-id-dialog.component';

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
    PlantIdResultsComponent,
  ],
  templateUrl: './plant-id.component.html',
  styleUrl: './plant-id.component.scss',
})
export class PlantIDComponent {
  public imagePreviews: string[] = [];
  public isLoading: boolean = false;
  public selectedFiles: File[] = [];
  public plantIDSignal = signal<PlantID[]>([]);

  constructor(
    private matDialog: MatDialog,
    private plantIDService: PlantIDService,
  ) {}

  public get plantIDs(): PlantID[] {
    return this.plantIDSignal();
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
    this.plantIDSignal.set([]);
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

  public onPlantIDClick(plantID: PlantID): void {
    this.isLoading = true;

    this.plantIDService
      .search(plantID.species?.scientificNameWithoutAuthor ?? '')
      .pipe(
        tap((result: Plant) => {
          this.isLoading = false;
        }),
        switchMap((result: Plant) => {
          var dialogRef = this.matDialog.open(PlantIDDialogComponent, { data: result });
          return dialogRef.afterClosed().pipe();
        }),
      )
      .subscribe();
  }

  //#endregion

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreviews.push(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
}
