import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/reportes'; // Asegúrate de que esta URL sea la correcta

  constructor(private http: HttpClient) { }

  downloadReport(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/centros/pdf`, { responseType: 'blob' });
  }
}
