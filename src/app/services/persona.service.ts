import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/personas';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  getPersona(id: number): Observable<Persona> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Persona>(url);
  }

  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona, this.httpOptions);
  }

  updatePersona(id: number, persona: Persona): Observable<Persona> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Persona>(url, persona, this.httpOptions);
  }

  deletePersona(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }

  getPersonasPorRol(rol: string): Observable<Persona[]> {
    const url = `${this.apiUrl}/rol/${rol}`;
    return this.http.get<Persona[]>(url);
  }
}
