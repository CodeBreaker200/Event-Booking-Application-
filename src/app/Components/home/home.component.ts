import { Component, inject, OnInit } from '@angular/core';
import { IApiResp, IEvent } from '../../Model/Interface/IEventModel';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../Services/event-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  eventService = inject(EventService);

  eventObj: IEvent [] = [];

  ngOnInit(): void {
    this.getAllEvent();
  }

  getAllEvent() {
    this.eventService.getEventApi().subscribe((res: IApiResp) => {
      this.eventObj = res.data;
    });
  }

}
