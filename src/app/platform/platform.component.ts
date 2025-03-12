import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FilterComponent } from '../filter/filter.component';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../interfaces/interface-service';
import { Header3Component } from '../header3/header3.component';
import { FilterMobileComponent } from '../filter-mobile/filter-mobile.component';

@Component({
  selector: 'app-platform',
  imports: [
    RouterModule,
    FilterComponent,
    ProductBoxComponent,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    Header3Component,
    FilterMobileComponent,
  ],
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.css',
  providers: [ProductService],
})
export class PlatformComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;
  isSidebarOpen = false;

  currentPriceRange: { min: number; max: number } = { min: 0, max: 0 };
  currentDiscount: number = 0;
  currentCategories: string[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  categoryMapping: { [key: string]: string[] } = {
    hombre: ['mens-shirts', 'mens-shoes'],
    mujer: ['tops', 'womens-dresses', 'womens-shoes'],
    accesorios: [
      'womens-watches',
      'womens-bags',
      'womens-jewellery',
      'sunglasses',
      'womens-bags',
      'womens-jewellery',
      'mens-watches',
      'womens-watches',
    ],
    'belleza y cuidado personal': ['fragrances', 'skincare'],
  };

  ngOnInit() {
    this.productService.getSelectedProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = [...this.products];

      this.minPrice = Math.min(...this.products.map((p) => p.price));
      this.maxPrice = Math.max(...this.products.map((p) => p.price));
      this.currentPriceRange = { min: this.minPrice, max: this.maxPrice };

      this.route.queryParams.subscribe((params) => {
        const category = params['category'];
        if (category) {
          this.currentCategories = [category];

          if (
            typeof window !== 'undefined' &&
            typeof localStorage !== 'undefined'
          ) {
            localStorage.setItem('selectedCategory', category);
          }

          this.applyFilters();
        }
      });
    });
  }

  toggleSidebar(event: MouseEvent) {
    this.isSidebarOpen = !this.isSidebarOpen;
    event.stopPropagation(); // Para que no se propague el clic al contenedor
  }

  closeSidebar(event: MouseEvent) {
    const filterElement = document.querySelector('app-filter-mobile');
    // Si se hace clic fuera del filtro y el filtro está abierto, lo cerramos
    if (this.isSidebarOpen && !filterElement?.contains(event.target as Node)) {
      this.isSidebarOpen = false;
    }
  }

  // Prevenir el cierre al hacer clic dentro del filtro
  preventClose(event: MouseEvent) {
    event.stopPropagation(); // Esto evita que el clic se propague y cierre el filtro
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesPrice =
        product.price >= this.currentPriceRange.min &&
        product.price <= this.currentPriceRange.max;

      const matchesDiscount =
        this.currentDiscount === 0 ||
        (this.currentDiscount === 30 &&
          product.discountPercentage >= 15 &&
          product.discountPercentage <= 25) ||
        (this.currentDiscount === 20 &&
          product.discountPercentage >= 5 &&
          product.discountPercentage <= 15) ||
        (this.currentDiscount === 10 && product.discountPercentage <= 20);

      const matchesCategory =
        this.currentCategories.length === 0 ||
        this.currentCategories.some((category) =>
          this.categoryMapping[category].includes(product.category)
        );

      return matchesPrice && matchesDiscount && matchesCategory;
    });
  }

  onPriceRangeChange(priceRange: { min: number; max: number }): void {
    this.currentPriceRange = priceRange;
    this.applyFilters();
  }

  onDiscountChange(selectedDiscount: number): void {
    this.currentDiscount = selectedDiscount;
    this.applyFilters();
  }

  onCategoryChange(selectedCategories: string[]): void {
    this.currentCategories = selectedCategories;
    this.applyFilters();
  }

  onSearch(searchText: string): void {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
