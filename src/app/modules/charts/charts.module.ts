import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { provideAnimations } from '@angular/platform-browser/animations';

// Components
import { BoxChartComponent } from './components/box-chart/box-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [BoxChartComponent, LineChartComponent],
  imports: [CommonModule, MatProgressSpinnerModule, NgxChartsModule],
  exports: [BoxChartComponent, LineChartComponent],
  providers: [provideAnimations()],
})
export class ChartsModule {}
