import { Component, ElementRef, Input } from '@angular/core';

import { BoxChartMultiSeries } from '@swimlane/ngx-charts';

import { NgxChartBase } from '../ngx-charts-base.model';

@Component({
  selector: 'app-box-chart',
  standalone: false,
  templateUrl: './box-chart.component.html',
  styleUrl: './box-chart.component.scss',
})
export class BoxChartComponent extends NgxChartBase {
  @Input() roundEdges: boolean = true;
  @Input({ required: true }) declare results: BoxChartMultiSeries;
  @Input() strokeColor: string = '#FFF';
  @Input() strokeWidth: number = 2;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
