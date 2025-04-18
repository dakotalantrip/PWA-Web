import { Component, Input } from '@angular/core';
import { PlantIDSearchResult } from '../../models/plant-id.model';

@Component({
  selector: 'app-plant-id-search-results',
  imports: [],
  templateUrl: './plant-id-search-results.component.html',
  styleUrl: './plant-id-search-results.component.scss',
})
export class PlantIdSearchResultsComponent {
  @Input({ required: true }) results: PlantIDSearchResult[] = [];
}
