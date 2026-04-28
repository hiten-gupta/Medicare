import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MedicineService } from '../../../services/medicine.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding:30px; max-width:1200px; margin:0 auto;">
      <h2>⚙️ Admin Dashboard</h2>
      <a routerLink="/admin/add-medicine"
         style="display:inline-block; background:#2563eb; color:white;
                padding:10px 20px; border-radius:8px; text-decoration:none; margin-bottom:30px;">
        + Add New Medicine
      </a>

      <h3>All Medicines</h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:40px;">
        <thead style="background:#f3f4f6;">
          <tr>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">ID</th>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Name</th>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Price</th>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Stock</th>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let med of medicines" style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:12px;">{{ med.id }}</td>
            <td style="padding:12px;">{{ med.name }}</td>
            <td style="padding:12px;">₹{{ med.price }}</td>
            <td style="padding:12px;">{{ med.stock }}</td>
            <td style="padding:12px;">
              <button (click)="deleteMedicine(med.id)"
                      style="background:#ef4444; color:white; border:none;
                             padding:6px 14px; border-radius:6px; cursor:pointer;">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>All Orders</h3>
      <table style="width:100%; border-collapse:collapse;">
        <thead style="background:#f3f4f6;">
          <tr>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Order ID</th>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Total</th>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Status</th>
            <th style="padding:12px; text-align:left; border-bottom:2px solid #e5e7eb;">Update</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let order of orders" style="border-bottom:1px solid #e5e7eb;">
            <td style="padding:12px;">#{{ order.id }}</td>
            <td style="padding:12px;">₹{{ order.totalAmount }}</td>
            <td style="padding:12px;">{{ order.status }}</td>
            <td style="padding:12px;">
              <select (change)="updateStatus(order.id, $event)"
                      style="padding:6px; border-radius:6px; border:1px solid #ccc;">
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  medicines: any[] = [];
  orders: any[] = [];

  constructor(private medicineService: MedicineService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.medicineService.getAllMedicines().subscribe(d => this.medicines = d);
    this.orderService.getAllOrders().subscribe(d => this.orders = d);
  }

  deleteMedicine(id: number): void {
    if (confirm('Delete this medicine?')) {
      this.medicineService.deleteMedicine(id).subscribe(() => {
        this.medicines = this.medicines.filter(m => m.id !== id);
      });
    }
  }

  updateStatus(orderId: number, event: any): void {
    this.orderService.updateOrderStatus(orderId, event.target.value).subscribe();
  }
}