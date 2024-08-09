import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../Services/event-service.service';
import { IApiResp } from '../../Model/Interface/IEventModel';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit {

  eventService = inject(EventService);
  userObj: any;
  bookingList : any[]=[];

  ngOnInit(): void {
    const loggedUserData = localStorage.getItem('loggedUser');
    if (loggedUserData != null) {
      this.userObj = JSON.parse(loggedUserData);
      this.getBooking();
    }
  }

  getBooking() {
    this.eventService.getBookingsByCustomer(this.userObj.userId).subscribe((res: IApiResp) => {
        this.bookingList = res.data;
    });
  }
}
