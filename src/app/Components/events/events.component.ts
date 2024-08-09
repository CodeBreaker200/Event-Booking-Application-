import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { EventService } from '../../Services/event-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResp, IEvent } from '../../Model/Interface/IEventModel';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, AppComponent, FormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  @ViewChild('model', { static: false }) model: ElementRef | undefined;

  eventService = inject(EventService);
  activatedRote = inject(ActivatedRoute);
  eventData$: Observable<IEvent> = new Observable<IEvent>;
  events$: Observable<IEvent[]> = new Observable<IEvent[]>;

  showModel = false;

  members: any = {
    "Name": "",
    "Age": 0,
    "IdentityCard": "",
    "CardNo": "",
    "ContactNo": ""
  }

  bookingObj: any = {
    "BookingId": 0,
    "UserId": 0,
    "EventId": 0,
    "NoOfTickets": 0,
    "EventBookingMembers": []
  };

  userObj: any;

  constructor() {
    const loggedUserData = localStorage.getItem('loggedUser');
    if (loggedUserData != null) {
      this.userObj = JSON.parse(loggedUserData);
      this.bookingObj.UserId = this.userObj.userId;
    }

    this.activatedRote.params.subscribe((res: any) => {
      this.bookingObj.EventId = res.id;
      this.eventData$ = this.eventService.getEventById(res.id);
      this.eventData$.subscribe((res: IEvent) => {
        this.events$ = this.eventService.getEventByOrganiserId(res.organizerId);
      })
    });
  }

  onShow() {
    this.showModel = true;
  };

  onClose() {
    this.showModel = false;
  };

  addBooking() {
    const newObj = JSON.stringify(this.members);
    const obj = JSON.parse(newObj);
    this.bookingObj.EventBookingMembers.push(obj);
    
  };

  onBook() {
    this.bookingObj.NoOfTickets = this.bookingObj.EventBookingMembers.length;
    this.eventService.bookEvent(this.bookingObj).subscribe((res: IApiResp) => {
      if (res.result) {
        alert("Booking Success");
      }
      else {
        alert(res.message);
      }
    })
   
  }


}