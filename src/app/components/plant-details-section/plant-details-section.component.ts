import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plant-details-section',
  imports: [TitleCasePipe],
  templateUrl: './plant-details-section.component.html',
  styleUrl: './plant-details-section.component.scss',
})
export class PlantDetailsSectionComponent {
  @Input() public data: string = '';
  @Input() public label: string = '';
}
