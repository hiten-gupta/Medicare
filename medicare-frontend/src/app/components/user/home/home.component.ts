import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align:center; padding:80px 20px;
                background:linear-gradient(135deg,#2563eb,#1e40af); color:white;">
      <h1 style="font-size:48px; margin-bottom:20px;">Your Health, Delivered 🏥</h1>
      <p style="font-size:20px; margin-bottom:40px;">
        Order medicines online from the comfort of your home
      </p>
      <a routerLink="/medicines"
         style="background:white; color:#2563eb; padding:15px 40px;
                border-radius:30px; font-size:18px; text-decoration:none; font-weight:bold;">
        Browse Medicines
      </a>
    </div>

    <div style="display:flex; justify-content:center; gap:40px; padding:60px; flex-wrap:wrap;">
      <div style="text-align:center; padding:30px; border:1px solid #e5e7eb; border-radius:12px; width:220px;">
        <div style="font-size:48px;">🚀</div>
        <h3>Fast Delivery</h3>
        <p style="color:gray;">Get your medicines delivered quickly</p>
      </div>
      <div style="text-align:center; padding:30px; border:1px solid #e5e7eb; border-radius:12px; width:220px;">
        <div style="font-size:48px;">💊</div>
        <h3>Genuine Medicines</h3>
        <p style="color:gray;">100% authentic and certified products</p>
      </div>
      <div style="text-align:center; padding:30px; border:1px solid #e5e7eb; border-radius:12px; width:220px;">
        <div style="font-size:48px;">🔒</div>
        <h3>Secure Payments</h3>
        <p style="color:gray;">Safe and encrypted payment gateway</p>
      </div>
    </div>
  `
})
export class HomeComponent {}