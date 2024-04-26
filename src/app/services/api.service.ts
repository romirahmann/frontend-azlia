import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // USER
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.api}/master/users`);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/user/${id}`);
  }
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/user/${id}`, data);
  }
  getAllRole(): Observable<any> {
    return this.http.get(`${this.api}/master/roles`);
  }

  // SUPPLIER
  getAllSupplier(): Observable<any> {
    return this.http.get(`${this.api}/master/suppliers`);
  }
  getSupplierById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/supplier/${id}`);
  }
  updateSupplier(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/supplier/${id}`, data);
  }
  insertSupplier(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/supplier`, data);
  }

  // JENIS BARANG
  getAllJenis(): Observable<any> {
    return this.http.get(`${this.api}/master/jenis`);
  }
  getJenisById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/jenis/${id}`);
  }
  updateJenis(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/jenis/${id}`, data);
  }
  insertJenis(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/jenis`, data);
  }

  // SATUAN BARANG
  getAllSatuan(): Observable<any> {
    return this.http.get(`${this.api}/master/satuan`);
  }
  getSatuanById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/satuan/${id}`);
  }
  updateSatuan(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/satuan/${id}`, data);
  }
  insertSatuan(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/satuan`, data);
  }

  // RAK GUDANG
  getAllRak(): Observable<any> {
    return this.http.get(`${this.api}/master/rak`);
  }
  getRakById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/rak/${id}`);
  }
  updateRak(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/rak/${id}`, data);
  }
  insertRak(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/rak`, data);
  }

  // BARANG
  getAllBarang(): Observable<any> {
    return this.http.get(`${this.api}/master/barang`);
  }
  getBarangById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/barang/${id}`);
  }
  updateBarang(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/barang/${id}`, data);
  }
  insertBarang(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/barang`, data);
  }

  // TRANSACTION
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.api}/master/categories`);
  }
  getAllTransaction(): Observable<any> {
    return this.http.get(`${this.api}/master/transactions`);
  }
  getTransactionById(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/transaction/${id}`);
  }
  updateTransaction(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/master/transaction/${id}`, data);
  }
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.api}/master/transaction/${id}`);
  }
  insertTransaction(data: any): Observable<any> {
    return this.http.post(`${this.api}/master/transaction`, data);
  }
  getTransactionByDate(month: number, year: number): Observable<any> {
    return this.http.get(
      `${this.api}/master/transaction-by-date/${month}/${year}`
    );
  }
  getTransactionByRak(id: number): Observable<any> {
    return this.http.get(`${this.api}/master/transaction-by-rak/${id}`);
  }
  getTransactionByKadaluarsa(
    month: number,
    year: number,
    day: number
  ): Observable<any> {
    return this.http.get(
      `${this.api}/master/transaction-by-kadaluarsa/${month}/${year}/${day}`
    );
  }
}
