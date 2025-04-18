import { Component, OnInit } from '@angular/core';
import { Plant } from '../../models/plant.model';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-plant-details',
  imports: [MatButtonModule, MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss',
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
