import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { filter, Observable, Subscription, switchMap, tap } from 'rxjs';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { EventDialogComponent } from '../../components/event-dialog/event-dialog.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { MatSymbolDirective } from '../../directives/mat-symbol.directive';

@Component({
  selector: 'app-dashboard',
  imports: [FullCalendarModule, MatIconModule, MatButtonModule, MatSymbolDirective],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public eventsSignal: WritableSignal<EventInput[]> = signal([]); // Signal to hold the events for the calendar

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', // Set the initial view of the calendar
    height: '95%', // Set the height of the calendar to 100% of its container
    plugins: [dayGridPlugin, interactionPlugin],
    select: this.onSelectClick.bind(this), // Bind the onSelectClick method to handle date selection
    selectable: true, // Enable date selection on the calendar
    events: signal<EventInput[]>([])(),
    droppable: true,
    eventDisplay: 'block',
  };

  private subscription: Subscription = new Subscription(); // Subscription to manage observables

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
  ) {
    const eventSubscription = this.eventService.events$
      .pipe(
        tap((events: Event[]) => {
          const formattedEvents: EventInput[] = events.map((event) => ({
            id: event.id.toString(),
            title: event.title,
            start: event.date,
            description: event.description,
            color: event.color,
          }));
          this.eventsSignal.set(formattedEvents);
          this.refreshCalendar();
        }),
      )
      .subscribe();
    this.subscription.add(eventSubscription); // Add the subscription to the main subscription to ensure cleanup on destroy
  }

  //#region Lifecycle Hooks

  public ngOnInit(): void {
    this.loadEvents();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Unsubscribe from all subscriptions to avoid memory leaks
    }
  }

  //#endregion

  //#region Events

  private handleDialogClose(dialogRef: MatDialogRef<any>, action: (event: Event) => Observable<any>): Observable<void> {
    return dialogRef.afterClosed().pipe(
      filter((event: Event | undefined) => !!event),
      switchMap((event: Event) => action(event)),
    );
  }

  public onDeleteClick(eventClick: EventClickArg): void {
    const eventID: number = eventClick.event.id ? parseInt(eventClick.event.id.toString(), 10) : NaN; // Get the event ID from the clicked event
    if (isNaN(eventID)) {
      return;
    } else {
      if (confirm('Delete this event?')) {
        this.eventService.deleteEvent(eventID).subscribe();
      }
    }
  }

  public onEditClick(arg: any): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: this.eventService.events.find((event: Event) => event.id === parseInt(arg.event.id)) || null, // Find the event by ID or return null if not found
    });

    this.handleDialogClose(dialogRef, (event: Event) => this.updateEvent$(event)).subscribe();
  }

  public onSelectClick(arg: DateSelectArg): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: { date: arg.startStr }, // Pass the selected date to the dialog component
    });

    let test = arg.view.calendar;

    this.handleDialogClose(dialogRef, (event: Event) => this.addEvent$(event)).subscribe();
  }

  //#endregion

  //#region Http

  private addEvent$(event: Event): Observable<Event | null> {
    return this.eventService.addEvent(event);
  }

  private loadEvents(): void {
    this.eventService.getEvents().subscribe();
  }

  private updateEvent$(event: Event): Observable<void> {
    return this.eventService.updateEvent(event);
  }

  //#endregion

  //#region Utility Methods

  private refreshCalendar(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.eventsSignal(), // Ensure the calendar options are updated with the latest events
    };
  }

  //#endregion
}
