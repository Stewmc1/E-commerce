import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { Header3Component } from '../header3/header3.component';

@Component({
  selector: 'app-help-client',
  imports: [HeaderComponent, FooterComponent, Header3Component],
  templateUrl: './help-client.component.html',
  styleUrl: './help-client.component.css',
})
export class HelpClientComponent {
  alertShow(event: Event) {
    event.preventDefault();

    Swal.fire({
      position: 'top',
      icon: 'success',
      title:
        'Tu pregunta ha sido enviada al equipo, en breve se te responderá vía email!',
      showConfirmButton: true,
    });
  }
}
