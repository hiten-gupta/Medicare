import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  addToCart(medicine: any, quantity = 1): void {
    const existing = this.cartItems.find(i => i.medicine.id === medicine.id);
    if (existing) { existing.quantity += quantity; }
    else { this.cartItems.push({ medicine, quantity }); }
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(medicineId: number): void {
    this.cartItems = this.cartItems.filter(i => i.medicine.id !== medicineId);
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(medicineId: number, quantity: number): void {
    const item = this.cartItems.find(i => i.medicine.id === medicineId);
    if (item) { item.quantity = quantity; if (quantity <= 0) this.removeFromCart(medicineId); }
    this.cartSubject.next([...this.cartItems]);
  }

  getTotal(): number { return this.cartItems.reduce((s, i) => s + i.medicine.price * i.quantity, 0); }
  getCartItems(): any[] { return this.cartItems; }
  clearCart(): void { this.cartItems = []; this.cartSubject.next([]); }
}