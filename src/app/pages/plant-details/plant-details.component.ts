import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Plant } from '../../models/plant.model';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-details',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatIconModule,
  ],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlantDetailsComponent implements OnInit {
  public title: string = 'Plant ID';
  public plant!: Plant;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.plant = this.route.snapshot.data['plant'];
  }

  public onWateringScheduleClick(): void {
    this.router.navigate(['/plant', this.plant.name, 'schedule']);
  }
}
