import { Component, ElementRef } from '@angular/core';

import { NgxLineChartBase } from '../ngx-charts-base.model';

@Component({
  selector: 'app-line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent extends NgxLineChartBase {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
