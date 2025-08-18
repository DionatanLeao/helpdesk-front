import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private httpClient: HttpClient) { }

  findById(id: any): Observable<Tecnico> {
    return this.httpClient.get<Tecnico>(`${API_CONFIG.baseUrl}/technicians/${id}`)
  }

  findAll(): Observable<Tecnico[]> {
    return this.httpClient.get<Tecnico[]>(`${API_CONFIG.baseUrl}/technicians`)
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.httpClient.post<Tecnico>(`${API_CONFIG.baseUrl}/technicians`, tecnico)
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.httpClient.put<Tecnico>(`${API_CONFIG.baseUrl}/technicians/${tecnico.id}`, tecnico)
  }
}
