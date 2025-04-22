import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlantID, PlantIDSearchResult } from '../../models/plant-id.model';

@Component({
  selector: 'app-plant-id-search-results',
  imports: [],
  templateUrl: './plant-id-search-results.component.html',
  styleUrl: './plant-id-search-results.component.scss',
})
export class PlantIdSearchResultsComponent {
  @Input({ required: true }) results: PlantIDSearchResult[] = [];

  @Output() click: EventEmitter<PlantIDSearchResult> = new EventEmitter<PlantIDSearchResult>();

  public onClick(plantIDSearchResult: PlantIDSearchResult): void {
    this.click.emit(plantIDSearchResult);
  }
}
