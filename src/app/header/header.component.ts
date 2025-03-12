import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  userName: string | null = null;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToInicio() {
    this.router.navigate(['FirstPage']);
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  navigateToStores() {
    this.router.navigate(['stores']);
  }

  navigateToHelp() {
    this.router.navigate(['help']);
  }
}
