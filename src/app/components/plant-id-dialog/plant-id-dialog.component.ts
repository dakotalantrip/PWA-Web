import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { Plant } from '../../models/plant.model';

@Component({
  selector: 'app-plant-id-dialog',
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatExpansionModule],
  templateUrl: './plant-id-dialog.component.html',
  styleUrl: './plant-id-dialog.component.scss',
})
export class PlantIDDialogComponent {
  public title: string = 'Plant ID';
  public plant: Plant;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plant,
  ) {
    this.plant = data;
  }
}
