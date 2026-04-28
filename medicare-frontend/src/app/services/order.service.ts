import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';
  constructor(private http: HttpClient) {}

  placeOrder(request: any): Observable<any> { return this.http.post<any>(`${this.apiUrl}/place`, request); }
  getMyOrders(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/my-orders`); }
  getAllOrders(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/admin/all`); }
  updateOrderStatus(id: number, status: string): Observable<any> { return this.http.put<any>(`${this.apiUrl}/admin/${id}/status?status=${status}`, {}); }
}