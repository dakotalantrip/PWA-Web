import { Component, ElementRef, Input } from '@angular/core';

import { curveBasis, CurveFactory } from 'd3-shape';

import { NgxChartsBase } from '../ngx-charts-base.model';
import { MultiSeries } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent extends NgxChartsBase {
  @Input() curve: CurveFactory = curveBasis;
  @Input() rangeFillOpacity: number = 0.15;
  @Input({ required: true }) declare results: MultiSeries;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
