import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-box',
  imports: [],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css',
})
export class ProductBoxComponent {
  @Input() product: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  addToCart(product: any) {
    const availableStock = this.productService.getStock(product.id);

    if (availableStock <= 0) {
      alert('Este producto está agotado.');
      return;
    }

    // Aquí llamamos al servicio en lugar de usar `cartItems`
    this.cartService.addToCart(product);
    this.productService.updateStock(product.id, availableStock - 1);
  }
}
