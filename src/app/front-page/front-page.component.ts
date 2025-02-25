import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Header2Component } from '../header2/header2.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-front-page',
  imports: [HeaderComponent, Header2Component, FooterComponent],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css',
})
export class FrontPageComponent {}
