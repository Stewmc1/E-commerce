import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cartData = new BehaviorSubject<any>({
    total: 0,
    subtotal: 0,
    products: [],
  });

  currentCartData = this.cartData.asObservable();

  updateCartData(total: number, subtotal: number, products: any[]) {
    this.cartData.next({ total, subtotal, products });
  }
}
