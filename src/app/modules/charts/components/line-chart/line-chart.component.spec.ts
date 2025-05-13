import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { curveBasis } from 'd3';

import { LineChartComponent } from './line-chart.component';
import { ChartsModule } from '../../charts.module';
import { mockMultiSeriesLarge, mockMultiSeriesMedium, mockMultiSeriesSmall } from '../../../../testing/mock-chart.data';

describe('LineChartComponent', () => {
  const mockData = mockMultiSeriesMedium;
  const mockDataLarge = mockMultiSeriesLarge;
  const mockDataSmall = mockMultiSeriesSmall;

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
    // Chart specific
    expect(component.curve).toBe(curveBasis);
    expect(component.rangeFillOpacity).toEqual(0.15);

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
  });

  it('should accept MultiSeries results', () => {
    component.results = mockData;
    fixture.detectChanges();

    expect(component.results).toEqual(mockData);
  });

  it('should render the ngx-charts-line-chart component when passed correct results', async () => {
    component.results = mockData;
    fixture.detectChanges();

    // Wait for afterViewInit()
    await fixture.whenStable();

    const element = fixture.nativeElement.querySelector('ngx-charts-line-chart');
    expect(element).toBeTruthy();
    expect(component.results).toEqual(mockData);
  });

  it('should render the ngx-charts-line-chart component when passed a small set of correct results', async () => {
    component.results = mockDataSmall;
    fixture.detectChanges();

    // Wait for afterViewInit()
    await fixture.whenStable();

    const element = fixture.nativeElement.querySelector('ngx-charts-line-chart');
    expect(element).toBeTruthy();
    expect(component.results).toEqual(mockDataSmall);
  });

  it('should render the ngx-charts-line-chart component when passed a large set of correct results', async () => {
    component.results = mockDataLarge;
    fixture.detectChanges();

    // Wait for afterViewInit()
    await fixture.whenStable();

    const element = fixture.nativeElement.querySelector('ngx-charts-line-chart');
    expect(element).toBeTruthy();
    expect(component.results).toEqual(mockDataLarge);
  });
});
