import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="padding:30px; max-width:800px; margin:0 auto;">
      <h2>🛒 Your Cart</h2>

      <div *ngIf="cartItems.length === 0" style="text-align:center; padding:60px; color:gray;">
        <p style="font-size:18px;">Your cart is empty.</p>
        <a routerLink="/medicines" style="color:#2563eb;">Browse medicines →</a>
      </div>

      <div *ngIf="cartItems.length > 0">
        <div *ngFor="let item of cartItems"
             style="display:flex; align-items:center; justify-content:space-between;
                    padding:15px; border-bottom:1px solid #e5e7eb;">
          <span style="font-weight:bold; width:200px;">{{ item.medicine.name }}</span>
          <span style="color:gray;">₹{{ item.medicine.price }}</span>
          <div style="display:flex; align-items:center; gap:10px;">
            <button (click)="decreaseQty(item)"
                    style="width:30px; height:30px; border-radius:50%; border:1px solid #ccc; cursor:pointer;">-</button>
            <span>{{ item.quantity }}</span>
            <button (click)="increaseQty(item)"
                    style="width:30px; height:30px; border-radius:50%; border:1px solid #ccc; cursor:pointer;">+</button>
          </div>
          <span style="font-weight:bold; color:#2563eb;">₹{{ item.medicine.price * item.quantity }}</span>
          <button (click)="removeItem(item.medicine.id)"
                  style="background:#ef4444; color:white; border:none;
                         padding:6px 12px; border-radius:6px; cursor:pointer;">Remove</button>
        </div>

        <div style="padding:20px 0; border-top:2px solid #2563eb; margin-top:20px;">
          <h3>Total: ₹{{ getTotal() }}</h3>
          <label style="display:block; margin:15px 0 5px; font-weight:bold;">Delivery Address:</label>
          <textarea [(ngModel)]="deliveryAddress" rows="3"
                    placeholder="Enter full delivery address..."
                    style="width:100%; padding:10px; border:1px solid #ccc;
                           border-radius:8px; font-size:14px; box-sizing:border-box;"></textarea>
          <button (click)="placeOrder()" [disabled]="!deliveryAddress"
                  style="margin-top:15px; background:#2563eb; color:white; border:none;
                         padding:14px 40px; border-radius:8px; font-size:16px;
                         cursor:pointer; width:100%;">
            Place Order (Dummy Payment) 🛒
          </button>
        </div>
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  deliveryAddress = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void { this.cartService.cart$.subscribe(items => this.cartItems = items); }
  increaseQty(item: any): void { this.cartService.updateQuantity(item.medicine.id, item.quantity + 1); }
  decreaseQty(item: any): void { this.cartService.updateQuantity(item.medicine.id, item.quantity - 1); }
  removeItem(id: number): void { this.cartService.removeFromCart(id); }
  getTotal(): number { return this.cartService.getTotal(); }

  placeOrder(): void {
    const req = {
      address: this.deliveryAddress,
      items: this.cartItems.map(i => ({ medicineId: i.medicine.id, quantity: i.quantity }))
    };
    this.orderService.placeOrder(req).subscribe({
      next: () => { alert('Order placed! 🎉'); this.cartService.clearCart(); this.router.navigate(['/orders']); },
      error: err => {
  console.error(err);
  alert('Error placing order. Make sure you are logged in!');
}
    });
  }
}