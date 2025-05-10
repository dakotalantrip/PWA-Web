import { Component, ElementRef, Input } from '@angular/core';

import { NgxChartsBase } from '../ngx-charts-base.model';
import { BoxChartMultiSeries } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-box-chart',
  standalone: false,
  templateUrl: './box-chart.component.html',
  styleUrl: './box-chart.component.scss',
})
export class BoxChartComponent extends NgxChartsBase {
  @Input({ required: true }) declare results: BoxChartMultiSeries;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
