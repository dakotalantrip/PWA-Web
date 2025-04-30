import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-plant-card',
  imports: [CommonModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.scss',
})
export class PlantCardComponent {
  @Input() alt: string | undefined = 'Plants';
  @Input() commonNames: string | string[] | undefined;
  @Input() imageUrl: string | undefined;
  @Input() confidenceScore: number | undefined;
  @Input() scientificName: string = 'Plant';

  constructor() {}
}
