import { Component } from '@angular/core';
import { Header2Component } from '../header2/header2.component';
import { HeaderComponent } from '../header/header.component';
import { LeftBarComponent } from '../left-bar/left-bar.component';
import { RightBarComponent } from '../right-bar/right-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-help-client',
  imports: [
    Header2Component,
    HeaderComponent,
    LeftBarComponent,
    RightBarComponent,
    FooterComponent,
  ],
  templateUrl: './help-client.component.html',
  styleUrl: './help-client.component.css',
})
export class HelpClientComponent {
  alertShow() {
    alert(
      'Ya se ha enviado la pregunta al equipo y en breve se te respondera via email!'
    );
  }
}
