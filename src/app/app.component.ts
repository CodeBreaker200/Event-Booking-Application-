import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from './Services/event-service.service';
import { IApiResp, loginClass, User } from './Model/Interface/IEventModel';
import { elementAt } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  @ViewChild('model', { static: false }) model: ElementRef | undefined;
  @ViewChild('registerModal', { static: false }) registerModal: ElementRef | undefined;

  eventService = inject(EventService);

  isNavbarCollapsed = true;
  isSearchOpen = false;
  showModal = false;
  showRegisterModal = false;
  showProfile = false;

  userObj: User = new User();
  logInObj: loginClass = new loginClass();

  constructor() {
    const loggedUserData = localStorage.getItem('loggedUser');
    if (loggedUserData != null) {
      this.userObj = JSON.parse(loggedUserData);
    }
  };

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  onPOpUp() {
    this.showRegisterModal = false;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onProfile() {
    this.showProfile = true;
  }

  openRegisterModal() {
    this.showModal = false;
    this.showRegisterModal = true;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  onRegister() {
    this.eventService.userRegistration(this.userObj).subscribe((res: IApiResp) => {
      if (res.result) {
        alert("User Register Succesfull");
        this.closeRegisterModal();
      }
      else {
        alert(res.message)
      }
    })
  }
  onLogin() {
    this.eventService.userLogin(this.logInObj).subscribe((res: IApiResp) => {
      if (res.result) {
        alert("Login Succesfull");
        localStorage.setItem('loggedUser', JSON.stringify(res.data));
        this.userObj = res.data;
        this.closeModal();
      }
      else {
        alert(res.message)
      }
    })
  }

  OnLogOut() {
    localStorage.removeItem('loggedUser');
    this.userObj = new User();
  }
}