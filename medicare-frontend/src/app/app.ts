import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav style="background:#2563eb; padding:15px; display:flex;
                justify-content:space-between; align-items:center;">
      <a routerLink="/home"
         style="color:white; font-size:22px; font-weight:bold; text-decoration:none;">
         💊 Medicare
      </a>
      <div style="display:flex; gap:20px; align-items:center;">
        <a routerLink="/home" style="color:white; text-decoration:none;">Home</a>
        <a routerLink="/medicines" style="color:white; text-decoration:none;">Medicines</a>
        <a routerLink="/cart" *ngIf="isLoggedIn"
           style="color:white; text-decoration:none;">🛒 Cart ({{ cartCount }})</a>
        <a routerLink="/orders" *ngIf="isLoggedIn"
           style="color:white; text-decoration:none;">My Orders</a>
        <a routerLink="/admin" *ngIf="isAdmin"
           style="color:yellow; text-decoration:none;">⚙ Admin</a>
        <a routerLink="/login" *ngIf="!isLoggedIn"
           style="color:white; text-decoration:none;">Login</a>
        <button *ngIf="isLoggedIn" (click)="logout()"
          style="background:white; color:#2563eb; border:none;
                 padding:8px 16px; border-radius:5px; cursor:pointer;">
          Logout
        </button>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class App implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  cartCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.role === 'ADMIN';
    });
    this.cartService.cart$.subscribe(items => {
      this.cartCount = items.reduce((s, i) => s + i.quantity, 0);
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}