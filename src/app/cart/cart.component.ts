import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Product } from '../interfaces/interface-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, HeaderComponent, ProductCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = [...items];
    });
  }

  increaseItemQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  updateQuantity(product: Product, quantity: number) {
    const cartItem = this.cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.cartService.updateCart(this.cartItems);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const discountAmount = (item.price * item.discountPercentage) / 100;
      const finalPrice = item.price - discountAmount;
      return total + finalPrice * item.quantity;
    }, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  getProductDetails(): any[] {
    return this.cartItems.map((item) => ({
      name: item.title,
      price: item.price,
      image: item.thumbnail,
      quantity: item.quantity,
    }));
  }

  updateSharedData() {
    const total = this.getTotal();
    const subtotal = this.getSubtotal();
    const products = this.getProductDetails();
    this.dataService.updateCartData(total, subtotal, products);
  }

  seguirComprando() {
    let category = 'hombre';
    try {
      if (
        typeof window !== 'undefined' &&
        typeof localStorage !== 'undefined'
      ) {
        category = localStorage.getItem('selectedCategory') || 'hombre';
      }
    } catch (error) {
      console.error('Error al acceder a localStorage:', error);
    }

    this.router.navigate(['/platform'], { queryParams: { category } });
  }

  NavigateToPaymentPage() {
    if (this.cartItems.length === 0) {
      Swal.fire({
        text: 'Tu carrito esta vacio, agrega algo para continuar!',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    this.router.navigate(['paymentPage']);
  }
}
