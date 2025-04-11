import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlantID } from '../../models/plant-id.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-plant-id-results',
  imports: [MatDividerModule],
  templateUrl: './plant-id-results.component.html',
  styleUrl: './plant-id-results.component.scss',
})
export class PlantIdResultsComponent {
  @Input({ required: true }) public plantIDs: PlantID[] = [];

  @Output() plantIDClick: EventEmitter<PlantID> = new EventEmitter<PlantID>();

  //#region Events

  public onClick(plantID: PlantID): void {
    this.plantIDClick.emit(plantID);
  }

  //#endregion

  public getScorePercent(score: number): string {
    return Math.ceil(score * 100).toString();
  }
}
