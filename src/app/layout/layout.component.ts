import { CommonModule } from '@angular/common';
import { Component , inject, OnInit} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent  implements OnInit{

  router = inject(Router);

  isSearchOpen = false;
  isNavbarCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}