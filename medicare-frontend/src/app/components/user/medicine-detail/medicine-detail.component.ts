import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MedicineService } from '../../../services/medicine.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-medicine-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="padding:40px; max-width:800px; margin:0 auto;" *ngIf="medicine">
      <a routerLink="/medicines" style="color:#2563eb; text-decoration:none;">← Back to Medicines</a>
      <h2 style="color:#1e40af; margin-top:20px;">{{ medicine.name }}</h2>
      <p style="font-size:16px; color:gray; line-height:1.6;">{{ medicine.description }}</p>
      <p style="font-size:32px; font-weight:bold; color:#2563eb;">₹{{ medicine.price }}</p>
      <p [style.color]="medicine.stock > 0 ? 'green' : 'red'" style="font-size:18px;">
        {{ medicine.stock > 0 ? 'In Stock (' + medicine.stock + ' units)' : 'Out of Stock' }}
      </p>
      <span *ngIf="medicine.requiresPrescription"
            style="background:#fef3c7; color:#d97706; padding:5px 15px;
                   border-radius:20px; font-size:14px;">Prescription Required</span>
      <div style="margin-top:30px;">
        <button (click)="addToCart()" [disabled]="medicine.stock === 0"
                style="background:#2563eb; color:white; border:none; padding:15px 40px;
                       border-radius:8px; font-size:18px; cursor:pointer;">
          Add to Cart 🛒
        </button>
      </div>
    </div>
    <div *ngIf="!medicine" style="text-align:center; padding:60px;">Loading...</div>
  `
})
export class MedicineDetailComponent implements OnInit {
  medicine: any = null;

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.medicineService.getMedicineById(id).subscribe(d => this.medicine = d);
  }

  addToCart(): void {
    this.cartService.addToCart(this.medicine);
    alert(`${this.medicine.name} added to cart!`);
  }
}