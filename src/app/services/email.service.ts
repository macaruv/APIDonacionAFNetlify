import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/email';

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, text: string, attachReport: boolean): Observable<any> {
    const params = new HttpParams()
      .set('to', to)
      .set('subject', subject)
      .set('text', text)
      .set('attachReport', attachReport.toString());

    return this.http.get(`${this.apiUrl}/send`, { params, responseType: 'text' });
  }
}
