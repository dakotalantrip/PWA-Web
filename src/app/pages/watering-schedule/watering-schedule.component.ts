import { Component, OnInit } from '@angular/core';
import { WateringScheduleFormComponent } from '../../components/watering-schedule-form/watering-schedule-form.component';
import { Plant } from '../../models/plant/plant.model';
import { ActivatedRoute, Route } from '@angular/router';
import { WateringScheduleService } from '../../services/watering-schedule.service';
import { IndoorWateringScheduleRequest } from '../../models/indoor-watering-schedule.model';

@Component({
  selector: 'app-watering-schedule',
  imports: [WateringScheduleFormComponent],
  templateUrl: './watering-schedule.component.html',
  styleUrl: './watering-schedule.component.scss',
})
export class WateringScheduleComponent implements OnInit {
  public plant!: Plant;
  public suggestedWateringSchedule!: IndoorWateringScheduleRequest;

  constructor(
    private route: ActivatedRoute,
    private wateringScheduleService: WateringScheduleService,
  ) {}

  ngOnInit(): void {
    this.plant = this.route.snapshot.data['plant'];
    this.suggestedWateringSchedule = this.route.snapshot.data['wateringScheduleSuggestion'];
  }

  public onFormSubmit(request: IndoorWateringScheduleRequest) {
    console.log(request);
  }
}
