import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { PlantIDDialogComponent } from '../../components/plant-id-dialog/plant-id-dialog.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlantIDService } from '../../services/plant-id.service';
import { PlantID, PlantIDRequest } from '../../models/plant-id.model';
import { finalize, tap } from 'rxjs';

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
  public formGroup: FormGroup;
  public imagePreview: string | null = null;
  public isLoading: boolean = false;
  public selectedFile: File | null = null;
  public plantIDResponse = signal<PlantID | null>(null);

  constructor(private formBuilder: FormBuilder, private plantIDService: PlantIDService) {
    this.formGroup = this.formBuilder.group({
      image: [''],
    });
  }

  public get plantID(): PlantID | null {
    return this.plantIDResponse();
  }

  //#region Events

  public onClearClick(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    this.formGroup.reset();
    this.plantIDResponse.set(null);
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
      const file = files[0];
      this.selectedFile = file;
      this.previewImage(file);
      this.formGroup.patchValue({ image: file });
    }
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage(file);
    }
  }

  public onIdentifyClick(): void {
    if (this.selectedFile) {
      this.isLoading = true;
      const plantID: PlantIDRequest = new PlantIDRequest(this.selectedFile, 'flower');
      this.plantIDService
        .identify(plantID)
        .pipe(
          tap((plantID: PlantID) => {
            this.plantIDResponse.set(plantID);
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
    }
  }

  //#endregion

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
