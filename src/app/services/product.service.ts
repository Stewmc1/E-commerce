import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/interface-service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products/category';
  private stockSource = new BehaviorSubject<{ [id: number]: number }>({});
  stock$ = this.stockSource.asObservable();

  constructor(private http: HttpClient) {}

  getSelectedProducts(): Observable<Product[]> {
    const selectedCategories = [
      'tops',
      'womens-dresses',
      'womens-shoes',
      'mens-shirts',
      'mens-shoes',
      'mens-watches',
      'womens-watches',
      'womens-bags',
      'womens-jewellery',
      'sunglasses',
      'fragrances',
      'skincare',
    ];

    return new Observable<Product[]>((observer) => {
      let allProducts: Product[] = [];
      let completedRequests = 0;

      selectedCategories.forEach((category) => {
        this.http
          .get<{ products: Product[] }>(`${this.baseUrl}/${category}`)
          .subscribe((response) => {
            allProducts = [...allProducts, ...response.products];
            completedRequests++;

            if (completedRequests === selectedCategories.length) {
              this.initializeStock(allProducts);
              observer.next(allProducts);
              observer.complete();
            }
          });
      });
    });
  }

  private initializeStock(products: Product[]) {
    const initialStock: { [id: number]: number } = {};
    products.forEach((product) => {
      initialStock[product.id] = product.stock;
    });
    this.stockSource.next(initialStock);
  }

  getStock(productId: number): number {
    return this.stockSource.value[productId] || 0;
  }

  updateStock(productId: number, newStock: number) {
    const updatedStock = { ...this.stockSource.value, [productId]: newStock };
    this.stockSource.next(updatedStock);
  }
}
