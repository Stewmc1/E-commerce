import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private selectedCategory = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategory.asObservable();

  setSelectedCategory(category: string) {
    this.selectedCategory.next(category);
  }
}
