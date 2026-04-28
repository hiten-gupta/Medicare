import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="display:flex; justify-content:center; align-items:center;
                min-height:80vh; background:#f3f4f6;">
      <div style="background:white; padding:40px; border-radius:16px;
                  box-shadow:0 4px 20px rgba(0,0,0,0.1); width:400px;">
        <h2 style="text-align:center; color:#1e40af;">💊 Medicare</h2>

        <div style="display:flex; margin-bottom:20px; border-bottom:2px solid #e5e7eb;">
          <button (click)="showRegister=false"
                  [style.borderBottom]="!showRegister?'2px solid #2563eb':'none'"
                  style="flex:1; padding:10px; background:none; border:none; cursor:pointer; font-size:16px;">
            Login
          </button>
          <button (click)="showRegister=true"
                  [style.borderBottom]="showRegister?'2px solid #2563eb':'none'"
                  style="flex:1; padding:10px; background:none; border:none; cursor:pointer; font-size:16px;">
            Register
          </button>
        </div>

        <div *ngIf="!showRegister">
          <input type="email" [(ngModel)]="loginData.email" placeholder="Email"
                 style="width:100%; padding:12px; margin-bottom:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
          <input type="password" [(ngModel)]="loginData.password" placeholder="Password"
                 style="width:100%; padding:12px; margin-bottom:20px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
          <button (click)="login()"
                  style="width:100%; padding:14px; background:#2563eb; color:white;
                         border:none; border-radius:8px; font-size:16px; cursor:pointer;">Login</button>
          <p style="color:red; text-align:center;" *ngIf="errorMsg">{{ errorMsg }}</p>
        </div>

        <div *ngIf="showRegister">
          <input type="text" [(ngModel)]="registerData.name" placeholder="Full Name"
                 style="width:100%; padding:12px; margin-bottom:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
          <input type="email" [(ngModel)]="registerData.email" placeholder="Email"
                 style="width:100%; padding:12px; margin-bottom:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
          <input type="password" [(ngModel)]="registerData.password" placeholder="Password"
                 style="width:100%; padding:12px; margin-bottom:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
          <input type="tel" [(ngModel)]="registerData.phone" placeholder="Phone"
                 style="width:100%; padding:12px; margin-bottom:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
          <button (click)="register()"
                  style="width:100%; padding:14px; background:#16a34a; color:white;
                         border:none; border-radius:8px; font-size:16px; cursor:pointer;">Register</button>
          <p style="color:green; text-align:center;" *ngIf="successMsg">{{ successMsg }}</p>
        </div>
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  showRegister = false;
  errorMsg = '';
  successMsg = '';
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '', phone: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMsg = '';
    this.authService.login(this.loginData).subscribe({
      next: res => this.router.navigate([res.role === 'ADMIN' ? '/admin' : '/home']),
      error: () => this.errorMsg = 'Invalid email or password!'
    });
  }

  register(): void {
    this.authService.register(this.registerData).subscribe({
      next: () => { this.successMsg = 'Registered! Please login.'; this.showRegister = false; },
      error: err => this.errorMsg = err.error
    });
  }
}