import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { PaymentPageComponent } from './payment-page/payment-page.component';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    AppComponent,
    PaymentPageComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
