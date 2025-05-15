import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { ChartsModule } from '../../charts.module';
import { BoxChartComponent } from './box-chart.component';
import { mockMultiSeriesMedium, mockMultiSeriesLarge, mockMultiSeriesSmall } from '../../../../testing/mock-chart.data';

describe('BoxChartComponent', () => {
  const mockData = mockMultiSeriesMedium;
  const mockDataLarge = mockMultiSeriesLarge;
  const mockDataSmall = mockMultiSeriesSmall;

  let component: BoxChartComponent;
  let fixture: ComponentFixture<BoxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsModule],
      providers: [{ provide: ElementRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default values', () => {
    // Chart specific
    expect(component.roundEdges).toBeTrue();
    expect(component.strokeColor).toBe('#FFF');
    expect(component.strokeWidth).toBe(2);

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

  it('should render the ngx-charts-box-chart component when passed correct results', async () => {
    component.results = mockData;
    fixture.detectChanges();

    // Wait for afterViewInit()
    await fixture.whenStable();

    const element = fixture.nativeElement.querySelector('ngx-charts-box-chart');
    expect(element).toBeTruthy();
    expect(component.results).toEqual(mockData);
  });

  it('should render the ngx-charts-box-chart component when passed a small set of correct results', async () => {
    component.results = mockDataSmall;
    fixture.detectChanges();

    // Wait for afterViewInit()
    await fixture.whenStable();

    const element = fixture.nativeElement.querySelector('ngx-charts-box-chart');
    expect(element).toBeTruthy();
    expect(component.results).toEqual(mockDataSmall);
  });

  it('should render the ngx-charts-box-chart component when passed a large set of correct results', async () => {
    component.results = mockDataLarge;
    fixture.detectChanges();

    // Wait for afterViewInit()
    await fixture.whenStable();

    const element = fixture.nativeElement.querySelector('ngx-charts-box-chart');
    expect(element).toBeTruthy();
    expect(component.results).toEqual(mockDataLarge);
  });
});
