import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AnatomicalPart, Plant } from '../../models/plant.model';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-plant-details',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlantDetailsComponent implements OnInit {
  public isDetailsDisplayed: boolean = false;
  public isMobile: boolean = false;
  public plant!: Plant;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.plant = this.route.snapshot.data['plant'];
    this.isMobile = window.matchMedia('(max-width: 768px)').matches;
  }

  //#region Events

  public onWateringScheduleClick(): void {
    this.router.navigate(['/plant', this.plant.name, 'schedule']);
  }

  //#endregion

  public getAnatomicalParts(): string {
    return this.plant.anatomy.map((value: AnatomicalPart) => value.name).join(', ');
  }
}
