import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { AnatomicalPart, Plant, RequirementLevel, WaterConsumption } from '../../models/plant/plant.model';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlantDetailsSectionComponent } from '../../components/plant-details-section/plant-details-section.component';

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
    PlantDetailsSectionComponent,
  ],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlantDetailsComponent implements OnInit {
  public isDetailsDisplayed: boolean = false;
  public plant!: Plant;
  public careRequirementLevel: number = 0;
  public lightRequirementLevel: number = 0;
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
    this.waterRequirementLevel = this.getRequirementLevel(this.plant.waterRequirement.toString());
    this.waterConsumptionResults = this.plant.waterConsumptions.map((waterConsumption: WaterConsumption) => {
      return { name: waterConsumption.month, value: waterConsumption.value };
    });
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
}
