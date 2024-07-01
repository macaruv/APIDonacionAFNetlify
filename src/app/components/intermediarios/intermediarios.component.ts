import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntermediarioService } from '../../services/intermediario.service';
import { Intermediario } from '../../models/intermediario.model';
import { IntermediarioFormComponent } from '../intermediarios-form/intermediarios-form.component';
import { CentroDeDonacionService } from '../../services/centro-de-donacion.service';

@Component({
  selector: 'app-intermediarios',
  standalone: true,
  templateUrl: './intermediarios.component.html',
  styleUrls: ['./intermediarios.component.css'],
  imports: [CommonModule, FormsModule, IntermediarioFormComponent]
})
export class IntermediariosComponent {
  intermediarios: Intermediario[] = [];
  centroId: number = 0;
  message: string | null = null;
  messageType: string = 'success';
  centroValid: boolean = false;

  constructor(
    private intermediarioService: IntermediarioService,
    private centroService: CentroDeDonacionService
  ) { }

  loadIntermediarios(): void {
    if (this.centroId > 0) {
      this.centroService.getCentroDeDonacion(this.centroId).subscribe(
        centro => {
          if (centro) {
            this.centroValid = true;
            this.intermediarioService.getIntermediarios(this.centroId).subscribe(
              data => {
                if (data.length > 0) {
                  this.intermediarios = data;
                  this.showMessage('Centro encontrado. Intermediarios cargados correctamente.', 'success');
                } else {
                  this.intermediarios = [];
                  this.showMessage('Centro encontrado, pero no hay intermediarios.', 'warning');
                }
              },
              error => {
                this.intermediarios = [];
                this.showMessage('Error al cargar los intermediarios.', 'danger');
              }
            );
          } else {
            this.intermediarios = [];
            this.showMessage('Centro no encontrado.', 'danger');
            this.centroValid = false;
          }
        },
        error => {
          this.intermediarios = [];
          this.showMessage('Centro no encontrado.', 'danger');
          this.centroValid = false;
        }
      );
    } else {
      this.intermediarios = [];
      this.showMessage('Por favor, ingrese un ID de centro válido.', 'warning');
      this.centroValid = false;
    }
  }

  onCentroIdChange(): void {
    this.loadIntermediarios();
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 4000); // Eliminar mensaje después de 3 segundos
  }
}
