import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FileUploadComponent implements OnInit {
  selectedFile: File | null = null;
  message: string | null = null;
  messageType: string = 'success';
  uploadedFiles: string[] = [];

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log(`File is ${Math.round((100 * event.loaded) / event.total!)}% uploaded.`);
          } else if (event instanceof HttpResponse) {
            this.showMessage('Archivo subido correctamente.', 'success');
            this.loadFiles(); // Reload the list of files
          }
        },
        error => {
          this.showMessage('Error al subir el archivo.', 'danger');
        }
      );
    }
  }

  loadFiles(): void {
    this.fileUploadService.listFiles().subscribe(
      files => this.uploadedFiles = files,
      () => this.showMessage('Error al cargar la lista de archivos.', 'danger')
    );
  }

  downloadFile(filename: string): void {
    this.fileUploadService.downloadFile(filename).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      () => this.showMessage('Error al descargar el archivo.', 'danger')
    );
  }

  deleteFile(filename: string): void {
    this.fileUploadService.deleteFile(filename).subscribe(
      () => {
        this.showMessage('Archivo eliminado correctamente.', 'success');
        this.loadFiles(); // Reload the list of files
      },
      () => this.showMessage('Error al eliminar el archivo.', 'danger')
    );
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 3000);
  }
}