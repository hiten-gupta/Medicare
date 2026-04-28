import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicineService {
  private apiUrl = 'http://localhost:8080/api/medicines';
  constructor(private http: HttpClient) {}

  getAllMedicines(): Observable<any[]> { return this.http.get<any[]>(this.apiUrl); }
  getMedicineById(id: number): Observable<any> { return this.http.get<any>(`${this.apiUrl}/${id}`); }
  searchMedicines(name: string): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/search?name=${name}`); }
  getMedicinesByCategory(id: number): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/category/${id}`); }
  addMedicine(medicine: any): Observable<any> { return this.http.post<any>(`${this.apiUrl}/admin/add`, medicine); }
  updateMedicine(id: number, medicine: any): Observable<any> { return this.http.put<any>(`${this.apiUrl}/admin/${id}`, medicine); }
  deleteMedicine(id: number): Observable<any> { return this.http.delete<any>(`${this.apiUrl}/admin/${id}`); }
}