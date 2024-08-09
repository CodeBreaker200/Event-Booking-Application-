import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResp, IEvent, loginClass, User } from '../Model/Interface/IEventModel';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/EventBooking/'

  constructor(private http: HttpClient) { }

  getEventApi() {
    return this.http.get<IApiResp>(`${this.apiUrl}GetAllEvents`);
  }

  getEventById(eventId: number) {
    return this.http.get<IEvent>(`${this.apiUrl}GetEventById?id=${eventId}`).pipe(map((item: any) => {
      return item.data;
    })
    )
  };

  getEventByOrganiserId(organizerId: number) {
    return this.http.get(`${this.apiUrl}GetEventsByOrganizer?organizerId=${organizerId}`).pipe(map((item: any) => {
      return item.data;
    }))
  }

  userRegistration(obj: User) {
    return this.http.post<IApiResp>(`${this.apiUrl}CreateUser`, obj);
  };

  userLogin(obj: loginClass) {
    return this.http.post<IApiResp>(`${this.apiUrl}Login`, obj);
  };

  bookEvent(obj: User) {
    return this.http.post<IApiResp>(`${this.apiUrl}BookEvent`, obj);
  };

  getBookingsByCustomer(id: number) {
    return this.http.get<IApiResp>(`${this.apiUrl}GetBookingsByCustomer?customerId=${id}`);
  }
}
