import { NgModule } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Components
import { BoxChartComponent } from './components/box-chart/box-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule({
  declarations: [BoxChartComponent, LineChartComponent],
  imports: [CommonModule, NgxChartsModule],
  exports: [BoxChartComponent, LineChartComponent],
  providers: [provideAnimations()],
})
export class ChartsModule {}
