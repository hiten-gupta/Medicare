import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding:30px; max-width:900px; margin:0 auto;">
      <h2>📦 My Orders</h2>

      <div *ngIf="orders.length === 0" style="text-align:center; padding:60px; color:gray;">
        <p>You have no orders yet.</p>
        <a routerLink="/medicines" style="color:#2563eb;">Start shopping →</a>
      </div>

      <div *ngFor="let order of orders"
           style="border:1px solid #e5e7eb; border-radius:12px; padding:20px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h3 style="margin:0;">Order #{{ order.id }}</h3>
          <span [style.color]="order.status==='DELIVERED'?'green':order.status==='CANCELLED'?'red':'#d97706'"
                style="font-weight:bold;">{{ order.status }}</span>
        </div>
        <p style="color:gray; margin:5px 0;">Address: {{ order.address }}</p>
        <p style="color:gray; margin:5px 0;">Payment: {{ order.paymentStatus }}</p>
        <p style="font-size:20px; font-weight:bold; color:#2563eb; margin-top:10px;">
          Total: ₹{{ order.totalAmount }}
        </p>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void { this.orderService.getMyOrders().subscribe(d => this.orders = d); }
}