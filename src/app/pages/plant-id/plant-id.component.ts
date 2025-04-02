import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { PlantIDDialogComponent } from '../../components/plant-id-dialog/plant-id-dialog.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-plant-id',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './plant-id.component.html',
  styleUrl: './plant-id.component.scss',
})
export class PlantIDComponent {
  public formGroup: FormGroup;
  public imagePreview: string | null = null;
  public selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog) {
    this.formGroup = this.formBuilder.group({
      image: [''],
    });
  }

  //#region Events

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

  public onIdentifyClick(): void {}

  //#endregion

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
    };
  }
}
