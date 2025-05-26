import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderTaskFormComponent } from './reminder-task-form.component';

describe('ReminderTaskFormComponent', () => {
  let component: ReminderTaskFormComponent;
  let fixture: ComponentFixture<ReminderTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderTaskFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
