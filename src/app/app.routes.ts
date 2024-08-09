import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { EventsComponent } from './Components/events/events.component';
import { MyBookingComponent } from './Components/my-booking/my-booking.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home', // Redirect empty path to /home by default
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'event/:id',
    component: EventsComponent
  },
  {
    path: 'my-booking',
    component: MyBookingComponent
  }
];
