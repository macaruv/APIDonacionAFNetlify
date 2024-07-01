import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CentroDeDonacionService } from '../../services/centro-de-donacion.service';
import { CentroDeDonacion } from '../../models/centro-de-donacion.model';
import { PdfReportComponent } from "../pdf-report/pdf-report.component";

@Component({
    selector: 'app-centro-de-donacion-form',
    standalone: true,
    templateUrl: './centro-de-donacion-form.component.html',
    styleUrls: ['./centro-de-donacion-form.component.css'],
    imports: [CommonModule, FormsModule, PdfReportComponent]
})
export class CentroDeDonacionFormComponent {
  centro: CentroDeDonacion = new CentroDeDonacion();
  @Output() refreshList = new EventEmitter<void>();
  message: string | null = null;
  messageType: string = 'success';

  constructor(private centroService: CentroDeDonacionService) { }

  onSubmit(): void {
    if (this.centro.id) {
      this.centroService.updateCentroDeDonacion(this.centro.id, this.centro).subscribe(() => {
        this.refreshList.emit();
        this.centro = new CentroDeDonacion();
        this.showMessage('Centro de donación actualizado correctamente.', 'success');
      }, () => {
        this.showMessage('Error al actualizar el centro de donación.', 'danger');
      });
    } else {
      this.centroService.createCentroDeDonacion(this.centro).subscribe(() => {
        this.refreshList.emit();
        this.centro = new CentroDeDonacion();
        this.showMessage('Centro de donación creado correctamente.', 'success');
      }, () => {
        this.showMessage('Error al crear el centro de donación.', 'danger');
      });
    }
  }

  deleteCentro(): void {
    if (this.centro.id) {
      this.centroService.deleteCentroDeDonacion(this.centro.id).subscribe(() => {
        this.refreshList.emit();
        this.centro = new CentroDeDonacion();
        this.showMessage('Centro de donación eliminado correctamente.', 'success');
      }, () => {
        this.showMessage('Error al eliminar el centro de donación.', 'danger');
      });
    }
  }

  loadCentro(): void {
    if (this.centro.id) {
      this.centroService.getCentroDeDonacion(this.centro.id).subscribe(data => {
        if (data) {
          this.centro = data;
          this.showMessage('Centro de donación encontrado.', 'success');
        } else {
          this.showMessage('Centro de donación no encontrado.', 'warning');
        }
      }, () => {
        this.showMessage('Error al buscar el centro de donación.', 'danger');
      });
    }
  }

  resetForm(): void {
    this.centro = new CentroDeDonacion();
    this.message = null;
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 5000); // Eliminar mensaje después de 3 segundos
  }
}
