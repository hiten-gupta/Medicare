import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MedicineService } from '../../../services/medicine.service';

@Component({
  selector: 'app-add-medicine',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="padding:30px; max-width:600px; margin:0 auto;">
      <h2>➕ Add New Medicine</h2>
      <div style="display:flex; flex-direction:column; gap:15px;">
        <div>
          <label style="font-weight:bold; display:block; margin-bottom:5px;">Medicine Name *</label>
          <input type="text" [(ngModel)]="medicine.name"
                 style="width:100%; padding:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
        </div>
        <div>
          <label style="font-weight:bold; display:block; margin-bottom:5px;">Description</label>
          <textarea [(ngModel)]="medicine.description" rows="4"
                    style="width:100%; padding:12px; border:1px solid #ccc;
                           border-radius:8px; box-sizing:border-box;"></textarea>
        </div>
        <div>
          <label style="font-weight:bold; display:block; margin-bottom:5px;">Price (₹) *</label>
          <input type="number" [(ngModel)]="medicine.price"
                 style="width:100%; padding:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
        </div>
        <div>
          <label style="font-weight:bold; display:block; margin-bottom:5px;">Stock *</label>
          <input type="number" [(ngModel)]="medicine.stock"
                 style="width:100%; padding:12px; border:1px solid #ccc;
                        border-radius:8px; box-sizing:border-box;" />
        </div>
        <div>
          <label style="font-weight:bold; display:block; margin-bottom:5px;">Category</label>
          <select [(ngModel)]="medicine.category"
                  style="width:100%; padding:12px; border:1px solid #ccc; border-radius:8px;">
            <option [ngValue]="null">-- Select Category --</option>
            <option *ngFor="let cat of categories" [ngValue]="cat">{{ cat.name }}</option>
          </select>
        </div>
        <div>
          <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
            <input type="checkbox" [(ngModel)]="medicine.requiresPrescription" />
            <span style="font-weight:bold;">Requires Prescription</span>
          </label>
        </div>
        <div style="display:flex; gap:15px;">
          <button (click)="addMedicine()"
                  style="flex:1; background:#2563eb; color:white; border:none;
                         padding:14px; border-radius:8px; font-size:16px; cursor:pointer;">
            Add Medicine
          </button>
          <a routerLink="/admin"
             style="flex:1; text-align:center; padding:14px; border:1px solid #2563eb;
                    color:#2563eb; border-radius:8px; text-decoration:none; font-size:16px;">
            Cancel
          </a>
        </div>
      </div>
    </div>
  `
})
export class AddMedicineComponent implements OnInit {
  medicine: any = { name: '', description: '', price: 0, stock: 0, category: null, requiresPrescription: false };
  categories: any[] = [];

  constructor(private medicineService: MedicineService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/categories').subscribe(d => this.categories = d);
  }

  addMedicine(): void {
    this.medicineService.addMedicine(this.medicine).subscribe({
      next: () => { alert('Medicine added!'); this.router.navigate(['/admin']); },
      error: err => alert('Error: ' + err.error)
    });
  }
}