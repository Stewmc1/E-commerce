import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Header2Component } from '../header2/header2.component';
import { LeftBarComponent } from '../left-bar/left-bar.component';
import { RightBarComponent } from '../right-bar/right-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-stores',
  imports: [
    HeaderComponent,
    Header2Component,
    LeftBarComponent,
    RightBarComponent,
    FooterComponent,
  ],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css',
})
export class StoresComponent {}
