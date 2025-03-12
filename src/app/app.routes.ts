import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PlatformComponent } from './platform/platform.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { CartComponent } from './cart/cart.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { LoginComponent } from './login/login.component';
import { StoresComponent } from './stores/stores.component';
import { HelpClientComponent } from './help-client/help-client.component';
import { FilterMobileComponent } from './filter-mobile/filter-mobile.component';

export const routes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: 'FirstPage', component: FrontPageComponent },
  { path: 'platform', component: PlatformComponent },
  { path: 'cart', component: CartComponent },
  { path: 'paymentPage', component: PaymentPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'help', component: HelpClientComponent },
  { path: 'filtro', component: FilterMobileComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
