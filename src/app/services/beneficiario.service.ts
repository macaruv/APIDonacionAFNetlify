import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Beneficiario } from '../models/beneficiario.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/centros';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBeneficiarios(centroId: number, intermediarioId: number): Observable<Beneficiario[]> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/beneficiarios`;
    return this.http.get<Beneficiario[]>(url).pipe(
      catchError(this.handleError<Beneficiario[]>('getBeneficiarios', []))
    );
  }

  getBeneficiario(centroId: number, intermediarioId: number, id: number): Observable<Beneficiario> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/beneficiarios/${id}`;
    return this.http.get<Beneficiario>(url).pipe(
      catchError(this.handleError<Beneficiario>('getBeneficiario'))
    );
  }

  createBeneficiario(centroId: number, intermediarioId: number, beneficiario: Beneficiario): Observable<Beneficiario> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/beneficiarios`;
    return this.http.post<Beneficiario>(url, beneficiario, this.httpOptions).pipe(
      catchError(this.handleError<Beneficiario>('createBeneficiario'))
    );
  }

  updateBeneficiario(centroId: number, intermediarioId: number, id: number, beneficiario: Beneficiario): Observable<Beneficiario> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/beneficiarios/${id}`;
    return this.http.put<Beneficiario>(url, beneficiario, this.httpOptions).pipe(
      catchError(this.handleError<Beneficiario>('updateBeneficiario'))
    );
  }

  deleteBeneficiario(centroId: number, intermediarioId: number, id: number): Observable<void> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/beneficiarios/${id}`;
    return this.http.delete<void>(url, this.httpOptions).pipe(
      catchError(this.handleError<void>('deleteBeneficiario'))
    );
  }

  verifyCentro(centroId: number): Observable<boolean> {
    const url = `${this.apiUrl}/${centroId}`;
    return this.http.get<boolean>(url).pipe(
      catchError(this.handleError<boolean>('verifyCentro', false))
    );
  }

  verifyIntermediario(centroId: number, intermediarioId: number): Observable<boolean> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}`;
    return this.http.get<boolean>(url).pipe(
      catchError(this.handleError<boolean>('verifyIntermediario', false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.error(`${operation} failed: Centro o intermediario no encontrado`);
        return throwError(() => new Error('Centro o intermediario no encontrado'));
      } else {
        console.error(`${operation} failed: ${error.message}`);
        return throwError(() => new Error('Error al cargar los beneficiarios'));
      }
    };
  }
}
