import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-box',
  imports: [CommonModule],
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
      Swal.fire({
        position: 'top',
        width: 400,
        text: 'Este producto esta agotado',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    this.cartService.addToCart(product);
    this.productService.updateStock(product.id, availableStock - 1);
  }
}
