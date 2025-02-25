import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header2',
  imports: [CommonModule],
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css'],
})
export class Header2Component {
  selectedCategory: string = '';
  position = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || '';
    });
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['/productos'], {
      queryParams: { category },
      queryParamsHandling: 'merge',
    });
  }

  navigateToPlatform(category: string): void {
    localStorage.setItem('selectedCategory', category);
    this.router.navigate(['/platform'], {
      queryParams: { category: category },
    });
  }
  moveBar(index: number) {
    const buttons = document.querySelectorAll('.nav');
    if (buttons.length > 0) {
      const button = buttons[index] as HTMLElement;
      this.position = button.offsetLeft;
      const bar = document.querySelector('.slide-bar') as HTMLElement;
      if (bar) {
        bar.style.width = `${button.offsetWidth}px`;
      }
    }
  }
}
