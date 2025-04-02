import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-plant-id-dialog',
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './plant-id-dialog.component.html',
  styleUrl: './plant-id-dialog.component.scss'
})
export class PlantIDDialogComponent {
  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Event | undefined
  ) {

    this.formGroup = this.formBuilder.group({
    })
  }
}
