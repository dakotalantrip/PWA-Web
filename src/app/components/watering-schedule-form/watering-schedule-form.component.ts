import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormControls } from '../../models/form-controls.model';
import { IndoorWateringScheduleRequest } from '../../models/indoor-watering-schedule.model';

@Component({
  selector: 'app-watering-schedule-form',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './watering-schedule-form.component.html',
  styleUrl: './watering-schedule-form.component.scss',
})
export class WateringScheduleFormComponent {
  @Input({ required: true }) suggestedSchedule!: IndoorWateringScheduleRequest;

  @Output() formSubmit: EventEmitter<IndoorWateringScheduleRequest> = new EventEmitter<IndoorWateringScheduleRequest>();

  public form: FormGroup<NonNullable<FormControls<IndoorWateringScheduleRequest>>>;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group<NonNullable<FormControls<IndoorWateringScheduleRequest>>>({
      plantName: new FormControl('', { nonNullable: true }),
      roomTemperature: new FormControl(70, { nonNullable: true }),
      humidityLevel: new FormControl(50, { nonNullable: true }),
      lightExposure: new FormControl('Medium', { nonNullable: true }),
      airflow: new FormControl('Moderate', { nonNullable: true }),
      location: new FormControl('', { nonNullable: true }),
      wateringMethod: new FormControl('Top water', { nonNullable: true }),
      potDrainage: new FormControl(true, { nonNullable: true }),
      potMaterial: new FormControl('Terracotta', { nonNullable: true }),
      soilType: new FormControl('', { nonNullable: true }),
      lastWateredDate: new FormControl(new Date().toISOString().split('T')[0], { nonNullable: true }),
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value as IndoorWateringScheduleRequest;
      console.log('Form submitted:', formData);
      this.formSubmit.emit(formData);
    }
  }

  public onSuggestedClick(field: keyof IndoorWateringScheduleRequest): void {
    this.form.get(field)?.setValue(this.suggestedSchedule[field]);
  }
}
