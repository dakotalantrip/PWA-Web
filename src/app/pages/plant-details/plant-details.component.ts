import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import * as shape from 'd3-shape';

import {
  AnatomicalPart,
  LightDuration,
  Plant,
  RequirementLevel,
  WaterConsumption,
} from '../../models/plant/plant.model';
import { MatSymbolDirective } from '../../directives/mat-symbol.directive';
import { PlantDetailsSectionComponent } from '../../components/plant-details-section/plant-details-section.component';
import { ChartsModule } from '../../modules/charts/charts.module';

@Component({
  selector: 'app-plant-details',
  imports: [
    ChartsModule,
    MatSymbolDirective,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    PlantDetailsSectionComponent,
    NgxChartsModule,
  ],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlantDetailsComponent implements OnInit {
  public curve = shape.curveBasis;
  public isDetailsDisplayed: boolean = false;
  public plant!: Plant;
  public careRequirementLevel: number = 0;
  public lightRequirementLevel: number = 0;
  public lightResults: any[] = [];
  public waterRequirementLevel: number = 0;
  public waterConsumptionResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.plant = this.route.snapshot.data['plant'];
    this.careRequirementLevel = this.getRequirementLevel(this.plant.careRequirement.toString());
    this.lightRequirementLevel = this.getRequirementLevel(this.plant.lightRequirement.toString());
    this.lightResults = [
      {
        name: '',
        series: this.plant.lightDurations.map((lightDuration: LightDuration) => {
          return {
            name: lightDuration.month,
            value: lightDuration.max,
          };
        }),
      },
    ];
    this.waterRequirementLevel = this.getRequirementLevel(this.plant.waterRequirement.toString());
    this.waterConsumptionResults = [
      {
        name: '',
        series: this.plant.waterConsumptions.map((waterConsumption: WaterConsumption) => {
          return { name: waterConsumption.month, value: waterConsumption.value };
        }),
      },
    ];
  }

  //#region Events

  public onWateringScheduleClick(): void {
    this.router.navigate(['/plant', this.plant.name, 'schedule']);
  }

  //#endregion

  public getAnatomicalParts(): string {
    return this.plant.anatomy
      .map((value: AnatomicalPart) => {
        return `${value.name}: ${value.colors.join(', ')}`;
      })
      .join(', ');
  }

  private getRequirementLevel(requirement: string): number {
    var level = RequirementLevel[requirement.toLocaleLowerCase() as any];
    return Number.parseInt(level);
  }

  public xAxisTickFormatter(value: any): any {
    return value;
  }
}
