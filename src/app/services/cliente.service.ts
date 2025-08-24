import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  findById(id: any): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${API_CONFIG.baseUrl}/clients/${id}`)
  }

  findAll(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${API_CONFIG.baseUrl}/clients`)
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${API_CONFIG.baseUrl}/clients`, cliente)
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${API_CONFIG.baseUrl}/clients/${cliente.id}`, cliente)
  }

  delete(id: any): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(`${API_CONFIG.baseUrl}/clients/${id}`)
  }
}
