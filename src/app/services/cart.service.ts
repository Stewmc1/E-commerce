import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../interfaces/interface-service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  private cartCount = new BehaviorSubject<number>(0); // 🔹 Nuevo Observable para el contador
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
        alert('No hay más stock disponible.');
      }
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next([...this.cartItems]);
    this.updateCartCount(); // 🔹 Actualizar el contador
    this.updateCartState();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next([...this.cartItems]);
    this.updateCartCount(); // 🔹 Actualizar el contador
    this.updateCartState();
  }

  private updateCartCount() {
    const totalItems = this.cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    this.cartCount.next(totalItems); // 🔹 Emitir el número total de productos
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item && quantity > 0 && quantity <= item.stock) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...this.cartItems]);
      this.updateCartState(); // 🔹 ACTUALIZA DataService
    }
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find((p) => p.id === productId);
    if (item && item.quantity !== undefined && item.quantity < item.stock) {
      item.quantity++;
      this.cartItemsSubject.next([...this.cartItems]);
      this.updateCartState(); // 🔹 ACTUALIZA DataService
    }
  }

  updateCart(cartItems: Product[]) {
    this.cartItems = cartItems;
    this.cartItemsSubject.next([...cartItems]);
    this.updateCartState(); // 🔹 Ahora también actualiza DataService
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
