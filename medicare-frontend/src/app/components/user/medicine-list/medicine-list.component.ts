import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MedicineService } from '../../../services/medicine.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="padding:30px; max-width:1200px; margin:0 auto;">
      <h2>Browse Medicines</h2>

      <input type="text" placeholder="Search medicines..."
             [(ngModel)]="searchTerm" (input)="onSearch()"
             style="width:100%; padding:12px; margin-bottom:20px;
                    border:1px solid #ccc; border-radius:8px; font-size:16px;" />

      <div style="margin-bottom:20px; display:flex; gap:10px; flex-wrap:wrap;">
        <button (click)="loadMedicines()"
                style="padding:8px 20px; border-radius:20px; border:none;
                       background:#2563eb; color:white; cursor:pointer;">All</button>
        <button (click)="filterByPrescription(false)"
                style="padding:8px 20px; border-radius:20px; border:1px solid #ccc; cursor:pointer;">OTC Only</button>
        <button (click)="filterByPrescription(true)"
                style="padding:8px 20px; border-radius:20px; border:1px solid #ccc; cursor:pointer;">Prescription</button>
        <select (change)="filterByCategory($event)"
                style="padding:8px 20px; border-radius:20px; border:1px solid #ccc;">
          <option value="">All Categories</option>
          <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
        </select>
      </div>

      <div *ngIf="loading" style="text-align:center; padding:40px;">Loading medicines...</div>

      <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:24px;"
           *ngIf="!loading">
        <div *ngFor="let medicine of medicines"
             style="border:1px solid #e5e7eb; border-radius:12px; padding:20px;
                    box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h3 style="color:#1e40af;">{{ medicine.name }}</h3>
          <p style="color:gray; font-size:14px;">{{ medicine.description?.slice(0,80) }}...</p>
          <p style="font-size:22px; font-weight:bold; color:#2563eb;">₹{{ medicine.price }}</p>
          <span *ngIf="medicine.requiresPrescription"
                style="background:#fef3c7; color:#d97706; padding:3px 10px;
                       border-radius:20px; font-size:12px;">Rx Required</span>
          <p [style.color]="medicine.stock > 0 ? 'green' : 'red'">
            {{ medicine.stock > 0 ? 'In Stock' : 'Out of Stock' }}
          </p>
          <div style="display:flex; gap:10px; margin-top:10px;">
            <a [routerLink]="['/medicines', medicine.id]"
               style="padding:8px 15px; border:1px solid #2563eb; border-radius:6px;
                      color:#2563eb; text-decoration:none; font-size:14px;">Details</a>
            <button (click)="addToCart(medicine)" [disabled]="medicine.stock === 0"
                    style="padding:8px 15px; background:#2563eb; color:white;
                           border:none; border-radius:6px; cursor:pointer;">Add to Cart</button>
          </div>
        </div>
        <p *ngIf="medicines.length === 0">No medicines found.</p>
      </div>
    </div>
  `
})
export class MedicineListComponent implements OnInit {
  medicines: any[] = [];
  categories: any[] = [];
  searchTerm = '';
  loading = false;

  constructor(
    private medicineService: MedicineService,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit(): void { this.loadMedicines(); this.loadCategories(); }

  loadMedicines(): void {
    this.loading = true;
    this.medicineService.getAllMedicines().subscribe({
      next: d => { this.medicines = d; this.loading = false; },
      error: () => this.loading = false
    });
  }

  loadCategories(): void {
    this.http.get<any[]>('http://localhost:8080/api/categories')
      .subscribe(d => this.categories = d);
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.medicineService.searchMedicines(this.searchTerm).subscribe(d => this.medicines = d);
    } else { this.loadMedicines(); }
  }

  filterByPrescription(requires: boolean): void {
    this.http.get<any[]>(`http://localhost:8080/api/medicines/prescription/${requires}`)
      .subscribe(d => this.medicines = d);
  }

  filterByCategory(event: any): void {
    const id = event.target.value;
    if (id) { this.medicineService.getMedicinesByCategory(Number(id)).subscribe(d => this.medicines = d); }
    else { this.loadMedicines(); }
  }

  addToCart(medicine: any): void {
    this.cartService.addToCart(medicine);
    alert(`${medicine.name} added to cart!`);
  }
}