import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { mockReminderLowPriority, mockReminders } from '../testing/mock-reminder.data';
import { Reminder } from '../models/reminder.model';
import { ReminderService } from './reminder.service';

describe('ReminderService', () => {
  let service: ReminderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ReminderService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ReminderService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //#region Reminders

  it('should default to an empty list of "Reminder" objects', () => {
    expect(service.reminders).toEqual([]);
  });

  it('should update the observable tracking the list of "Reminder" objects', () => {
    service.reminders = mockReminders;

    service.reminders$.subscribe((data: Reminder[]) => {
      expect(data).toEqual(mockReminders);
    });
  });

  //#endregion

  //#region Add

  it('should call the correct URL for add()', () => {
    service.add(mockReminderLowPriority).subscribe((data: Reminder | null) => {
      expect(data).toEqual(mockReminderLowPriority);
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/Add`);

    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(mockReminderLowPriority);
  });

  it('should update the running list of "Reminder" objects with the added object after calling add()', () => {
    service.add(mockReminderLowPriority).subscribe((data: Reminder | null) => {
      expect(data).toEqual(mockReminderLowPriority);
      expect(data).toBeTruthy();
      expect(service.reminders.includes(data!));
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/Add`);

    testRequest.flush(mockReminderLowPriority);
  });

  it('should not update the running list of "Reminder" objects when "NULL" is returned', () => {
    service.add(mockReminderLowPriority).subscribe((data: Reminder | null) => {
      expect(data).toEqual(mockReminderLowPriority);
      expect(service.reminders).toEqual([]);
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/Add`);

    testRequest.flush(null);
  });

  //#endregion
});
