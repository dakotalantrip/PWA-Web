import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { remindersResolver } from './reminders.resolver';

describe('remindersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => remindersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
