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

  findAll(): Observable<Tecnico[]> {
    return this.httpClient.get<Tecnico[]>(`${API_CONFIG.baseUrl}/technicians`)
  }
}
