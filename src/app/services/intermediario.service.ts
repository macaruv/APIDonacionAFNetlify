import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intermediario } from '../models/intermediario.model';

@Injectable({
  providedIn: 'root'
})
export class IntermediarioService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/centros'; // URL del backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getIntermediarios(centroId: number): Observable<Intermediario[]> {
    const url = `${this.apiUrl}/${centroId}/intermediarios`;
    return this.http.get<Intermediario[]>(url);
  }

  getIntermediario(centroId: number, id: number): Observable<Intermediario> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${id}`;
    return this.http.get<Intermediario>(url);
  }

  createIntermediario(centroId: number, intermediario: Intermediario): Observable<Intermediario> {
    const url = `${this.apiUrl}/${centroId}/intermediarios`;
    return this.http.post<Intermediario>(url, intermediario, this.httpOptions);
  }

  updateIntermediario(centroId: number, id: number, intermediario: Intermediario): Observable<Intermediario> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${id}`;
    return this.http.put<Intermediario>(url, intermediario, this.httpOptions);
  }

  deleteIntermediario(centroId: number, id: number): Observable<void> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
