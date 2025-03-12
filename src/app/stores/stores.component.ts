import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Header3Component } from '../header3/header3.component';

@Component({
  selector: 'app-stores',
  imports: [HeaderComponent, FooterComponent, CommonModule, Header3Component],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css',
})
export class StoresComponent {
  isMobile: boolean = window.innerWidth < 768;
  isMenuOpen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
