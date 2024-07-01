import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Donador } from '../models/donador.model';

@Injectable({
  providedIn: 'root'
})
export class DonadorService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/centros'; // URL del backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getDonadores(centroId: number, intermediarioId: number): Observable<Donador[]> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/donadores`;
    return this.http.get<Donador[]>(url).pipe(
      catchError(this.handleError<Donador[]>('getDonadores', []))
    );
  }

  getDonador(centroId: number, intermediarioId: number, id: number): Observable<Donador> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/donadores/${id}`;
    return this.http.get<Donador>(url).pipe(
      catchError(this.handleError<Donador>('getDonador'))
    );
  }

  createDonador(centroId: number, intermediarioId: number, donador: Donador): Observable<Donador> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/donadores`;
    return this.http.post<Donador>(url, donador, this.httpOptions).pipe(
      catchError(this.handleError<Donador>('createDonador'))
    );
  }

  updateDonador(centroId: number, intermediarioId: number, id: number, donador: Donador): Observable<Donador> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/donadores/${id}`;
    return this.http.put<Donador>(url, donador, this.httpOptions).pipe(
      catchError(this.handleError<Donador>('updateDonador'))
    );
  }

  deleteDonador(centroId: number, intermediarioId: number, id: number): Observable<void> {
    const url = `${this.apiUrl}/${centroId}/intermediarios/${intermediarioId}/donadores/${id}`;
    return this.http.delete<void>(url, this.httpOptions).pipe(
      catchError(this.handleError<void>('deleteDonador'))
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
        return throwError(() => new Error('Error al cargar los donadores'));
      }
    };
  }
}


// // Convertir Alergias y Enfermedades a arrays antes de enviar al servidor
// this.donador.Alergias = this.alergiasString.split(',').map(alergia => alergia.trim());
// this.donador.Enfermedades = this.enfermedadesString.split(',').map(enfermedad => enfermedad.trim());
// alergiasString: string = '';
//   enfermedadesString: string = '';