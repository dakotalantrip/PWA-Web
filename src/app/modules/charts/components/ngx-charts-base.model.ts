import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MultiSeries, Series } from '@swimlane/ngx-charts';

@Component({
  template: '',
})
export abstract class NgxChartsBase {
  // Color
  @Input() customColors: any;
  @Input() gradient: boolean = false;
  @Input() scheme: any;
  @Input() schemeType: SchemeType = 'ordinal';

  // Display
  @Input() legend: boolean = true;
  @Input() legendPosition: LegendPosition = 'right';
  @Input() legendTitle: string = 'Legend';
  @Input() showGridLines: boolean = false;
  @Input() showRefLabels: boolean = true;
  @Input() showRefLines: boolean = false;
  @Input() timeline: boolean = false;
  @Input() wrapTicks: boolean = false;

  // Functionality
  @Input() autoScale: boolean = false;
  @Input() roundDomains: boolean = false;
  @Input() tooltipDisabled: boolean = false;

  // Data
  @Input() activeEntries: any[] = [];
  @Input() referenceLines: any[] = [];
  @Input({ required: true }) abstract results: Series | MultiSeries;

  // Tooltip
  @Input() seriesTooltipTemplate?: TemplateRef<any>;
  @Input() tooltipTemplate?: TemplateRef<any>;

  // X Axis
  @Input() maxXAxisTickLength: number = 16;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() trimXAxisTicks: boolean = true;
  @Input() xAxis: boolean = true;
  @Input() xAxisLabel?: string;
  @Input() xAxisTickFormatting: (value: any) => string = (value: any) => {
    return value;
  };
  @Input() xAxisTicks: any[] = [];
  @Input() xScaleMax: any;
  @Input() xScaleMin: any;

  // Y Axis
  @Input() maxYAxisTickLength: number = 16;
  @Input() rotateYAxisTicks: boolean = true;
  @Input() showYAxisLabel: boolean = true;
  @Input() trimYAxisTicks: boolean = true;
  @Input() yAxis: boolean = true;
  @Input() yAxisLabel?: string;
  @Input() yAxisTickFormatting: (value: any) => string = (value: any) => {
    return value;
  };
  @Input() yAxisTicks: any[] = [];
  @Input() yScaleMax?: number;
  @Input() yScaleMin?: number;

  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  @Output() deactivate: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor(public elementRef: ElementRef) {}
}

export type LegendPosition = 'right' | 'below';
export type SchemeType = 'ordinal' | 'linear';
