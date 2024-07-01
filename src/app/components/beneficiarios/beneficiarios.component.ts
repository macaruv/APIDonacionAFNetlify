import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeneficiarioService } from '../../services/beneficiario.service';
import { Beneficiario } from '../../models/beneficiario.model';
import { BeneficiarioFormComponent } from '../beneficiario-form/beneficiario-form.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-beneficiarios',
  standalone: true,
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css'],
  imports: [CommonModule, FormsModule, BeneficiarioFormComponent]
})
export class BeneficiariosComponent {
  beneficiarios: Beneficiario[] = [];
  centroId: number = 0;
  intermediarioId: number = 0;
  message: string | null = null;
  messageType: string = 'success';
  centroValid: boolean = false;
  intermediarioValid: boolean = false;
  formDisabled: boolean = true;

  constructor(private beneficiarioService: BeneficiarioService) { }

  loadBeneficiarios(): void {
    if (this.centroId > 0 && this.intermediarioId > 0) {
      forkJoin([
        this.beneficiarioService.verifyCentro(this.centroId),
        this.beneficiarioService.verifyIntermediario(this.centroId, this.intermediarioId)
      ]).subscribe(
        ([centroValid, intermediarioValid]) => {
          this.centroValid = centroValid;
          this.intermediarioValid = intermediarioValid;

          if (centroValid && intermediarioValid) {
            this.formDisabled = false;
            this.beneficiarioService.getBeneficiarios(this.centroId, this.intermediarioId).subscribe(
              data => {
                if (data && Array.isArray(data) && data.length > 0) {
                  this.beneficiarios = data;
                  this.showMessage('Beneficiarios cargados correctamente.', 'success');
                } else {
                  this.beneficiarios = [];
                  this.showMessage('Centro e intermediario encontrados, pero no hay beneficiarios registrados.', 'warning');
                }
              },
              error => {
                this.beneficiarios = [];
                this.showMessage('Error al cargar los beneficiarios.', 'danger');
              }
            );
          } else {
            this.beneficiarios = [];
            this.formDisabled = true;
            this.showMessage('Centro o intermediario no encontrado.', 'danger');
          }
        },
        error => {
          this.beneficiarios = [];
          this.formDisabled = true;
          this.showMessage('Centro o intermediario no encontrado.', 'danger');
        }
      );
    } else {
      this.showMessage('Por favor, ingrese un ID de centro y de intermediario válidos.', 'warning');
      this.formDisabled = true;
    }
  }

  onCentroIdChange(): void {
    this.centroValid = this.centroId > 0;
    this.intermediarioValid = this.intermediarioId > 0;
  }

  refreshBeneficiariosList(): void {
    this.loadBeneficiarios();
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 5000); // Eliminar mensaje después de 5 segundos
  }
}
