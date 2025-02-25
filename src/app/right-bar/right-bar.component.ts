import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-right-bar',
  imports: [RouterModule, CommonModule],
  templateUrl: './right-bar.component.html',
  styleUrl: './right-bar.component.css',
})
export class RightBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  cartCount: number = 0;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
      this.animateCart();
    });
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  animateCart() {
    if (typeof document !== 'undefined') {
      // 👈 Verificamos si estamos en el navegador
      setTimeout(() => {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
          cartCountElement.classList.remove('animate');
          void (cartCountElement as HTMLElement).offsetWidth; // Reinicia la animación
          cartCountElement.classList.add('animate');
        }
      }, 10);
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchEvent.emit(input.value);
  }

  addToCart() {
    this.cartCount++;
  }
}
