import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';

// Components
import { PlantIDComponent } from './pages/plant-id/plant-id.component';
import { PlantDetailsComponent } from './pages/plant-details/plant-details.component';
import { PlantResolver } from './resolvers/plant.resolver';
import { WateringScheduleComponent } from './pages/watering-schedule/watering-schedule.component';
import { WateringScheduleSuggestionResolver } from './resolvers/watering-schedule-suggestion.resolver';

// Resolvers

export const routes: Routes = [
  { path: '', redirectTo: 'plantID', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plantID', component: PlantIDComponent },
  { path: 'plant/:name', component: PlantDetailsComponent, resolve: { plant: PlantResolver } },
  {
    path: 'plant/:name/schedule',
    component: WateringScheduleComponent,
    resolve: { plant: PlantResolver, wateringScheduleSuggestion: WateringScheduleSuggestionResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
