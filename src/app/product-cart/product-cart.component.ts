import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../interfaces/interface-service';

@Component({
  selector: 'app-product-cart',
  imports: [FormsModule],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css',
})
export class ProductCartComponent {
  @Input() product: any;
  @Output() updateQuantityEvent = new EventEmitter<{
    product: any;
    quantity: number;
  }>();
  @Output() removeProductEvent = new EventEmitter<number>();

  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.quantity = this.product.quantity; // Reflejar la cantidad actualizada
    }
  }

  increaseQuantity() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
      this.emitQuantityChange();
    } else {
      alert('No hay más stock disponible.');
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.emitQuantityChange();
    }
  }

  onQuantityInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).valueAsNumber;
    if (inputValue >= 1 && inputValue <= this.product.stock) {
      this.quantity = inputValue;
      this.emitQuantityChange();
    } else {
      this.quantity = this.product.quantity; // Resetear si el valor es inválido
    }
  }

  private emitQuantityChange() {
    this.updateQuantityEvent.emit({
      product: this.product,
      quantity: this.quantity,
    });
  }

  updateQuantity() {
    const currentStock = this.productService.getStock(this.product.id);
    const cartProduct = this.cartService
      .getCartItems()
      .find((item) => item.id === this.product.id);
    const previousQuantity = cartProduct?.quantity ?? 0;
    const quantityDifference = this.quantity - previousQuantity;

    if (quantityDifference > currentStock) {
      alert('No hay suficiente stock disponible.');
      this.quantity = previousQuantity ?? 1;

      return;
    }

    this.updateQuantityEvent.emit({
      product: this.product,
      quantity: this.quantity,
    });

    this.productService.updateStock(
      this.product.id,
      currentStock - quantityDifference
    );
  }

  removeProduct() {
    this.removeProductEvent.emit(this.product);

    const currentStock = this.productService.getStock(this.product.id);
    this.productService.updateStock(
      this.product.id,
      currentStock + this.quantity
    );
  }

  removeFromCart() {
    this.removeProductEvent.emit(this.product.id);
  }
}
