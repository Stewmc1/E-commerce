import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../interfaces/interface-service';
import { DataService } from './data.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private dataService: DataService) {}

  getCartItems(): Product[] {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      if (
        existingItem.quantity !== undefined &&
        existingItem.quantity < product.stock
      ) {
        existingItem.quantity++;
      } else {
        Swal.fire('No hay mas stock disponible de este producto');
      }
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next([...this.cartItems]);
    this.updateCartCount();
    this.updateCartState();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next([...this.cartItems]);
    this.updateCartCount();
    this.updateCartState();
  }

  private updateCartCount() {
    const totalItems = this.cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    this.cartCount.next(totalItems);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item && quantity > 0 && quantity <= item.stock) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...this.cartItems]);
      this.updateCartState();
    }
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item && item.quantity !== undefined && item.quantity < item.stock) {
      item.quantity++;
      this.cartItemsSubject.next([...this.cartItems]);
      this.updateCartState();
    }
  }

  updateCart(cartItems: Product[]) {
    this.cartItems = cartItems;
    this.cartItemsSubject.next([...cartItems]);
    this.updateCartState();
  }

  private updateCartState() {
    const total = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity!,
      0
    );
    const subtotal = total;

    this.dataService.updateCartData(total, subtotal, [...this.cartItems]);
  }
}
