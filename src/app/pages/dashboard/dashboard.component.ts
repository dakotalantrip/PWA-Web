import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the day grid plugin for FullCalendar
import interactionPlugin from '@fullcalendar/interaction'; // Import the interaction plugin for handling date clicks
import { EventDialogComponent } from '../../components/event-dialog/event-dialog.component';
import { EventService } from '../../services/event.service';
import { catchError, filter, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-dashboard',
  imports: [FullCalendarModule, MatCardModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public eventsSignal: WritableSignal<EventInput[]> = signal([]); // Signal to hold the events for the calendar
  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Set the initial view of the calendar
    height: '95%', // Set the height of the calendar to 100% of its container
    plugins: [dayGridPlugin, interactionPlugin],
    select: this.onSelectClick.bind(this), // Bind the onSelectClick method to handle date selection
    selectable: true, // Enable date selection on the calendar
    eventClick: this.onEventClick.bind(this), // Bind the onEventClick method to handle event clicks
    events: signal<EventInput[]>([])(),
  };

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  //#region Lifecycle Hooks

  public ngOnInit(): void {
    this.loadEvents();
  }

  //#endregion

  //#region Events

  public onEventClick(arg: any): void {
    alert(arg.event.title); // This method will be called when an event on the calendar is clicked
  }

  public onSelectClick(arg: DateSelectArg): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: { date: arg.startStr }, // Pass the selected date to the dialog component
    });

    dialogRef.afterClosed()
      .pipe(
        filter((event: Event | undefined) => !!event),
        switchMap((event: Event) => this.addEvent$(event)))
      .subscribe({
        next: (addedEvent: Event | null) => {
          if (addedEvent) {
            const newEventInput: EventInput = {
              title: addedEvent.title,
              start: addedEvent.date, // Format the date for FullCalendar
              description: addedEvent.description,
            };
            this.addEvent(newEventInput); // Add the new event to the calendar
          }
        }
      });
  }

  //#endregion

  //#region Http

  private addEvent$(event: Event): Observable<Event | null> {
    return this.eventService.addEvent(event).pipe(
      tap((response) => console.log('Event added:', response)),
      catchError((error) => {
        console.error('Error adding event:', error); // Handle error if adding the event fails
        return of(null);
      })
    );
  }

  private loadEvents(): void {
    this.eventService.getEvents().subscribe((events) => {
      // Load events from the EventService and update the events signal
      const formattedEvents: EventInput[] = events.map((event) => ({
        title: event.title,
        start: event.date, // Assuming 'date' is in a format that FullCalendar can understand
        description: event.description,
      }));
      this.eventsSignal.set(formattedEvents); // Set the events signal with the formatted events
      this.refreshCalendar();
    });
  }

  //#endregion

  //#region Utility Methods

  private addEvent(newEvent: EventInput) {
    this.eventsSignal.update((events) => [...events, newEvent]); // Add a new event to the events array by updating the signal
    this.refreshCalendar();
  }

  private refreshCalendar(): void {
    // This method can be used to refresh the calendar if needed
    // For example, if you want to reload events or update the calendar view
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.eventsSignal(), // Ensure the calendar options are updated with the latest events
    };
  }

  //#endregion
}
