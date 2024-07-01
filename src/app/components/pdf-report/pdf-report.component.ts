import { Component } from '@angular/core';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdf-report',
  templateUrl: './pdf-report.component.html',
  styleUrls: ['./pdf-report.component.css'],
  standalone: true,
  imports: []
})
export class PdfReportComponent {

  constructor(private PdfService: PdfService) { }

  generateReport(): void {
    this.PdfService.downloadReport().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al generar el reporte', error);
      }
    );
  }
}
