import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { BoxChartComponent } from './box-chart.component';
import { ChartsModule } from '../../charts.module';

describe('BoxChartComponent', () => {
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
});
