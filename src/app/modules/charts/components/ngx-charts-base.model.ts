import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { LegendPosition, MultiSeries, ScaleType, Series } from '@swimlane/ngx-charts';
import { curveBasis, CurveFactory } from 'd3';

@Component({
  template: '',
})
export abstract class NgxChartBase implements AfterViewInit {
  // Color
  @Input() customColors: any;
  @Input() gradient: boolean = false;
  @Input() scheme: any = {
    domain: ['#004d7a'],
  };
  @Input() schemeType: ScaleType = ScaleType.Linear;

  // Display
  @Input() legend: boolean = true;
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() legendTitle: string = 'Legend';
  @Input() showGridLines: boolean = false;
  @Input() showRefLabels: boolean = true;
  @Input() showRefLines: boolean = false;
  @Input() wrapTicks: boolean = false;

  // Functionality
  @Input() animations: boolean = false;
  @Input() autoScale: boolean = false;
  @Input() roundDomains: boolean = false;
  @Input() tooltipDisabled: boolean = false;

  // Data
  @Input() activeEntries: any[] = [];
  @Input() referenceLines: any[] = [];
  @Input({ required: true }) abstract results: Series | MultiSeries;

  // Tooltip
  @Input() seriesTooltipTemplateRef?: TemplateRef<any>;
  @Input() tooltipTemplateRef?: TemplateRef<any>;

  // X Axis
  @Input() maxXAxisTickLength: number = 16;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() trimXAxisTicks: boolean = true;
  @Input() xAxis: boolean = true;
  @Input() xAxisLabel: string = '';
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
  @Input() yAxisLabel: string = '';
  @Input() yAxisTickFormatting: (value: any) => string = (value: any) => {
    return value;
  };
  @Input() yAxisTicks: any[] = [];
  @Input() yScaleMax: number = 0;
  @Input() yScaleMin: number = 0;

  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  @Output() deactivate: EventEmitter<any> = new EventEmitter<any>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor(public elementRef: ElementRef) {}

  ngAfterViewInit(): void {}
}

@Component({
  template: '',
})
export abstract class NgxLineChartBase extends NgxChartBase {
  @Input() curve: CurveFactory = curveBasis;
  @Input() rangeFillOpacity: number = 0.15;
  @Input({ required: true }) declare results: MultiSeries;
  @Input() timeline: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
