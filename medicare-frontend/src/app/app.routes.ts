import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./components/user/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'medicines',
    loadComponent: () => import('./components/user/medicine-list/medicine-list.component').then(m => m.MedicineListComponent)
  },
  {
    path: 'medicines/:id',
    loadComponent: () => import('./components/user/medicine-detail/medicine-detail.component').then(m => m.MedicineDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/user/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/user/orders/orders.component').then(m => m.OrdersComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard],
    data: { requiresAdmin: true }
  },
  {
    path: 'admin/add-medicine',
    loadComponent: () => import('./components/admin/add-medicine/add-medicine.component').then(m => m.AddMedicineComponent),
    canActivate: [authGuard],
    data: { requiresAdmin: true }
  },
  { path: '**', redirectTo: '/home' }
];