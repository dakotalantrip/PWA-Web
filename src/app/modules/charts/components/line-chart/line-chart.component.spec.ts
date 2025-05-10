import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { curveBasis } from 'd3';

import { LineChartComponent } from './line-chart.component';
import { ChartsModule } from '../../charts.module';

describe('LineChartComponent', () => {
  const mockData = [
    {
      name: 'Test A',
      series: [
        { name: 'a1', value: 1 },
        { name: 'a2', value: 2 },
      ],
    },
    {
      name: 'Test b',
      series: [
        { name: 'b1', value: 1 },
        { name: 'b2', value: 2 },
      ],
    },
  ];

  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsModule],
      providers: [{ provide: ElementRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default values', () => {
    expect(component.curve).toBe(curveBasis);

    expect(component.legend).toBeTrue();
    expect(component.showRefLabels).toBeTrue();
    expect(component.showXAxisLabel).toBeTrue();
    expect(component.trimXAxisTicks).toBeTrue();
    expect(component.xAxis).toBeTrue();
    expect(component.showYAxisLabel).toBeTrue();
    expect(component.trimYAxisTicks).toBeTrue();
    expect(component.yAxis).toBeTrue();

    expect(component.gradient).toBeFalse();
    expect(component.showGridLines).toBeFalse();
    expect(component.showRefLines).toBeFalse();
    expect(component.timeline).toBeFalse();
    expect(component.wrapTicks).toBeFalse();
    expect(component.autoScale).toBeFalse();
    expect(component.roundDomains).toBeFalse();
    expect(component.tooltipDisabled).toBeFalse();

    expect(component.maxXAxisTickLength).toEqual(16);
    expect(component.maxYAxisTickLength).toEqual(16);
    expect(component.rangeFillOpacity).toEqual(0.15);
  });

  it('should accept MultiSeries results', () => {
    component.results = mockData;
    fixture.detectChanges();

    expect(component.results).toEqual(mockData);
  });

  it('should render the ngx-charts-line-chart component when passed correct results', () => {
    component.results = mockData;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('ngx-charts-chart');
    expect(component.results).toEqual(mockData);
  });
});
