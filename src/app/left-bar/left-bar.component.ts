import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  imports: [RouterModule],
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.css',
})
export class LeftBarComponent {
  constructor(private router: Router) {}

  navigateToInicio() {
    this.router.navigate(['FirstPage']);
  }

  redirectWithAlert() {
    const confirmRedirect = confirm(
      '¿Estás seguro de que quieres abandonar esta página? Serás redirigido a la pagina del juego.'
    );

    if (confirmRedirect) {
      window.open('https://chromedino.com', '_blank');
    }
  }
}
