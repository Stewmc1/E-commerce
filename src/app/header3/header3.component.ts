import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-headerprueba',
  imports: [RouterModule, CommonModule],
  templateUrl: './header3.component.html',
  styleUrl: './header3.component.css',
})
export class Header3Component {
  @Output() searchEvent = new EventEmitter<string>();
  cartCount: number = 0;
  selectedCategory: string = '';
  position = 0;
  isMenuOpen: boolean = false;
  isMobileMenuOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || '';
    });
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
      this.animateCart();
    });
  }

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/productos'], {
      queryParams: { category },
      queryParamsHandling: 'merge',
    });
    this.isMenuOpen = false;
  }

  navigateToPlatform(category: string): void {
    localStorage.setItem('selectedCategory', category);
    this.router.navigate(['/platform'], {
      queryParams: { category: category },
    });
    this.isMenuOpen = false;
  }

  moveBar(index: number) {
    const buttons = document.querySelectorAll('.nav');
    const bar = document.querySelector('.slide-bar') as HTMLElement;

    if (buttons.length > 0 && bar) {
      const button = buttons[index] as HTMLElement;
      const container = document.querySelector('.nav-container') as HTMLElement;

      if (button && container) {
        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const offsetLeft = buttonRect.left - containerRect.left;

        bar.style.width = `${button.offsetWidth}px`;
        bar.style.left = `${offsetLeft}px`;
      }
    }
  }

  navigateToInicio() {
    this.router.navigate(['FirstPage']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  animateCart() {
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
          cartCountElement.classList.remove('animate');
          void (cartCountElement as HTMLElement).offsetWidth;
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
