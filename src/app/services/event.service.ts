import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Event } from '../models/event.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class EventService extends BaseApiService {
  private eventsSubject: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]); // Cache for events to avoid multiple calls

  public events$: Observable<Event[]> = this.eventsSubject.asObservable(); // Expose the observable for components to subscribe to

  public get events(): Event[] {
    return this.eventsSubject.value; // Getter to access the current value of the events in the cache
  }

  public set events(value: Event[]) {
    this.eventsSubject.next(value); // Setter to update the BehaviorSubject with a new array of events
  }

  constructor(private http: HttpClient) {
    super(http, 'Events');
    this.getEvents().subscribe(); // Preload the events when the service is instantiated to ensure the cache is populated
  }

  public addEvent(event: Event): Observable<Event | null> {
    return this.post<Event>('', event).pipe(
      tap((event: Event) => {
        if (event) {
          // When a new event is added, update the BehaviorSubject with the new list of events
          const currentEvents = this.eventsSubject.value;
          this.events = [...currentEvents, event];
        }
      }),
    );
  }

  public deleteEvent(id: number): Observable<void> {
    return this.delete<void>(`${id}`).pipe(
      tap(() => {
        // When an event is deleted, update the BehaviorSubject to remove the deleted event
        this.events = this.events.filter((event) => event.id !== id);
      }),
    );
  }

  public getEvents(): Observable<Event[]> {
    return this.events.length > 0
      ? this.events$
      : this.get<Event[]>('').pipe(
          tap((response) => {
            this.events = response; // Update the BehaviorSubject with the latest events
          }),
        );
  }

  public getEvent(id: number): Observable<Event> {
    return this.get<Event>(`${id}`); // Make a GET request to fetch the event by ID
  }

  public updateEvent(event: Event): Observable<void> {
    return this.put<void>(`${event.id}`, event).pipe(
      tap(() => {
        const updatedEvents = this.events.map((value: Event) => (event.id === value.id ? event : value));
        this.events = updatedEvents;
      }),
    );
  }
}
