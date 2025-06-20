import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  constructor() {}

  getCategories() {
    return this.http.get(environment.fakeUrl);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.baseUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/${id}`);
  }
}
