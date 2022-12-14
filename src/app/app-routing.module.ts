import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'products/:productId/:argument2',
    component: ProductDetailsComponent,

  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
    canActivate: [AuthGuard]
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
