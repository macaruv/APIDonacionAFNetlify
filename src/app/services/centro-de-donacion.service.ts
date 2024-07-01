import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroDeDonacion } from '../models/centro-de-donacion.model';

@Injectable({
  providedIn: 'root'
})
export class CentroDeDonacionService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/centros'; // URL del backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCentrosDeDonacion(): Observable<CentroDeDonacion[]> {
    return this.http.get<CentroDeDonacion[]>(this.apiUrl);
  }

  getCentroDeDonacion(id: number): Observable<CentroDeDonacion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CentroDeDonacion>(url);
  }

  createCentroDeDonacion(centro: CentroDeDonacion): Observable<CentroDeDonacion> {
    return this.http.post<CentroDeDonacion>(this.apiUrl, centro, this.httpOptions);
  }

  updateCentroDeDonacion(id: number, centro: CentroDeDonacion): Observable<CentroDeDonacion> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<CentroDeDonacion>(url, centro, this.httpOptions);
  }

  deleteCentroDeDonacion(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
