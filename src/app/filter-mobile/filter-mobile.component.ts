import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter-mobile',
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-mobile.component.html',
  styleUrl: './filter-mobile.component.css',
})
export class FilterMobileComponent {
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  @Input() selectedCategory: string = '';
  @Output() priceRangeChange = new EventEmitter<{ min: number; max: number }>();
  @Output() discountChange = new EventEmitter<number>();
  @Output() categoryChange = new EventEmitter<string[]>();

  selectedMinPrice: number = this.minPrice;
  selectedMaxPrice: number = this.maxPrice;

  selectedDiscount: number = 0;
  selectedCategories: { [key: string]: boolean } = {
    hombre: false,
    mujer: false,
    accesorios: false,
    'belleza y cuidado personal': false,
  };

  ngOnChanges() {
    if (this.selectedCategory) {
      this.selectedCategories[this.selectedCategory] = true;
      this.applyCategoryFilter(this.selectedCategory);
    }
    this.selectedMaxPrice = this.maxPrice;
    this.selectedMinPrice = this.minPrice;
  }

  private priceRangeSubject = new Subject<{ min: number; max: number }>();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.priceRangeSubject
      .pipe(debounceTime(300))
      .subscribe((range) => this.priceRangeChange.emit(range));
  }

  onMinPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedMinPrice = +input.value;
    this.emitPriceRange();
  }

  onMaxPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedMaxPrice = +input.value;
    this.emitPriceRange();
  }

  emitPriceRange(): void {
    this.priceRangeSubject.next({
      min: this.selectedMinPrice,
      max: this.selectedMaxPrice,
    });
  }

  applyDiscountFilter(discount: number): void {
    this.selectedDiscount = discount;
    this.discountChange.emit(this.selectedDiscount);
  }

  applyCategoryFilter(categoryKey: string): void {
    Object.keys(this.selectedCategories).forEach((key) => {
      this.selectedCategories[key] = false;
    });

    this.selectedCategories[categoryKey] = true;

    const selectedCategories = Object.keys(this.selectedCategories).filter(
      (key) => this.selectedCategories[key]
    );

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: categoryKey },
      queryParamsHandling: 'merge',
    });

    this.categoryChange.emit(selectedCategories);
  }

  clearFilters(): void {
    this.selectedMinPrice = this.minPrice;
    this.selectedMaxPrice = this.maxPrice;
    this.selectedDiscount = 0;
    this.selectedCategories = {
      hombre: false,
      mujer: false,
      accesorios: false,
      'belleza y cuidado personal': false,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: null },
      queryParamsHandling: 'merge',
    });

    this.categoryChange.emit([]);
  }
}
