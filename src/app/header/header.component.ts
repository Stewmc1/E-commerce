import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}

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
