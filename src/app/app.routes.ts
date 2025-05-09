import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';

// Components
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { PlantIDComponent } from './pages/plant-id/plant-id.component';
import { PlantDetailsComponent } from './pages/plant-details/plant-details.component';
import { PlantResolver } from './resolvers/plant.resolver';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { WateringScheduleComponent } from './pages/watering-schedule/watering-schedule.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { PublicGuard } from './guards/public.guard';

// Resolvers
import { WateringScheduleSuggestionResolver } from './resolvers/watering-schedule-suggestion.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'plantID', component: PlantIDComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'registration', component: UserRegistrationComponent, canActivate: [PublicGuard] },
  {
    path: 'plant/:name',
    component: PlantDetailsComponent,
    canActivate: [AuthGuard],
    resolve: { plant: PlantResolver },
  },
  {
    path: 'plant/:name/schedule',
    component: WateringScheduleComponent,
    canActivate: [AuthGuard],
    resolve: { plant: PlantResolver, wateringScheduleSuggestion: WateringScheduleSuggestionResolver },
  },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
