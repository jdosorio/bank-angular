import { Routes } from '@angular/router';
import { TableComponent } from './domains/product/product-list/product-list.component';
import { ProductDetailComponent } from './domains/product/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'products', component: TableComponent },
  { path: 'product/:mode/:id', component: ProductDetailComponent },
  { path: 'product/:mode', component: ProductDetailComponent },
];
