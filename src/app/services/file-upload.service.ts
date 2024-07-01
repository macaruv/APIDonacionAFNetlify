// file-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'https://apidonacionsbrender.onrender.com/api/files';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  listFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${encodeURIComponent(filename)}`, { responseType: 'blob' });
  }

  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${encodeURIComponent(filename)}`);
  }
}
