import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-page',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent {
  cartItems: any[] = [];
  total: number = 0;
  subtotal: number = 0;
  products: any[] = [];
  minExpirationDate: string = '';

  formData = {
    fullName: '',
    address: '',
    email: '',
    city: '',
    postalCode: '',
    state: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.currentCartData.subscribe((data) => {
      this.total = data.total;
      this.subtotal = data.subtotal;
      this.products = data.products;
      this.setMinExpirationDate();
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Uy',
        text: 'Completa todos los datos para seguir :)',
      });
      return;
    } else {
      const translations: { [key: string]: string } = {
        fullName: 'Nombre completo',
        address: 'Dirección',
        email: 'Correo electrónico',
        city: 'Ciudad',
        postalCode: 'Código postal',
        state: 'Estado',
        cardNumber: 'Número de tarjeta',
        expirationDate: 'Fecha de expiración',
        cvv: 'CVV',
      };

      const formDataFormatted = Object.entries(this.formData)
        .map(([key, value]) => `<b>${translations[key] || key}:</b> ${value}`)
        .join('<br>');

      Swal.fire({
        icon: 'success',
        title: 'Pago realizado con éxito',
        html: formDataFormatted,
      });
    }
  }

  onInput(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    const filteredValue = value.replace(/\D/g, '');

    switch (field) {
      case 'cvv':
        input.value = filteredValue.slice(0, 3);
        this.formData.cvv = input.value;
        break;

      case 'cardNumber':
        const formattedValue = this.formatCardNumber(
          filteredValue.slice(0, 16)
        );
        input.value = formattedValue;
        this.formData.cardNumber = formattedValue;
        break;

      case 'postalCode':
        input.value = filteredValue.slice(0, 5);
        this.formData.postalCode = input.value;
        break;

      default:
        break;
    }
  }

  private formatCardNumber(value: string): string {
    return value.replace(/(\d{4})(?=\d)/g, '$1-');
  }

  setMinExpirationDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    this.minExpirationDate = `${year}-${month}`;
  }

  onExpirationDateChange() {
    if (!this.formData.expirationDate) return;

    const [inputYear, inputMonth] = this.formData.expirationDate
      .split('-')
      .map(Number);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    if (
      inputYear < currentYear ||
      (inputYear === currentYear && inputMonth < currentMonth)
    ) {
      Swal.fire('La tarjeta esta vencida');
      this.formData.expirationDate = '';
    }
  }
}
