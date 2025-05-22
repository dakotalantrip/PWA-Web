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

  const updatedReminders: Reminder[] = mockReminders.concat(mockReminderLowPriority);

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
    service.add(mockReminderLowPriority).subscribe((value: Reminder[]) => {
      expect(value).toEqual(updatedReminders);
      expect(value).toContain(mockReminderLowPriority);
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/Add`);
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(mockReminderLowPriority);

    const testGetByUserRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/GetByUser`);
    expect(testGetByUserRequest.request.method).toBe('GET');
    testGetByUserRequest.flush(updatedReminders);
  });

  it('should call add() with the passed-in "Reminder" object', () => {
    const spy = spyOn(service, 'add');

    service.add(mockReminderLowPriority);

    expect(spy).toHaveBeenCalledWith(mockReminderLowPriority);
  });

  it('should update the running list of "Reminder" objects with the added object after successful response', () => {
    service.add(mockReminderLowPriority).subscribe((data: Reminder[]) => {
      expect(data).toBeTruthy();
      expect(data).toContain(mockReminderLowPriority);
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/Add`);
    testRequest.flush(mockReminderLowPriority);

    const testGetByUserRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/GetByUser`);
    testGetByUserRequest.flush(updatedReminders);
  });

  it('should not update the running list of "Reminder" objects when "NULL" is returned', () => {
    const initialReminders: Reminder[] = service.reminders;

    service.add(mockReminderLowPriority).subscribe(() => {
      expect(service.reminders).toEqual(initialReminders);
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/Add`);
    testRequest.flush(null);

    const testGetByUserRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/GetByUser`);
    testGetByUserRequest.flush(initialReminders);
  });

  it('should complete after emitting or error', (done: DoneFn) => {
    service.add(mockReminderLowPriority).subscribe({
      complete: () => {
        done();
      },
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/Add`);
    testRequest.flush(null);

    const testGetByUserRequest = httpTestingController.expectOne(`${environment.apiUrl}/Reminder/GetByUser`);
    testGetByUserRequest.flush([]);
  });

  //#endregion
});
