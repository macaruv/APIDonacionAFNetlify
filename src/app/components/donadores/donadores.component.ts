import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonadorService } from '../../services/donador.service';
import { Donador } from '../../models/donador.model';
import { DonadorFormComponent } from '../donador-form/donador-form.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-donadores',
  standalone: true,
  templateUrl: './donadores.component.html',
  styleUrls: ['./donadores.component.css'],
  imports: [CommonModule, FormsModule, DonadorFormComponent]
})
export class DonadoresComponent {
  donadores: Donador[] = [];
  centroId: number = 0;
  intermediarioId: number = 0;
  message: string | null = null;
  messageType: string = 'success';
  centroValid: boolean = false;
  intermediarioValid: boolean = false;
  formDisabled: boolean = true;

  constructor(private donadorService: DonadorService) { }

  loadDonadores(): void {
    if (this.centroId > 0 && this.intermediarioId > 0) {
      forkJoin([
        this.donadorService.verifyCentro(this.centroId),
        this.donadorService.verifyIntermediario(this.centroId, this.intermediarioId)
      ]).subscribe(
        ([centroValid, intermediarioValid]) => {
          this.centroValid = centroValid;
          this.intermediarioValid = intermediarioValid;

          if (centroValid && intermediarioValid) {
            this.formDisabled = false;
            this.donadorService.getDonadores(this.centroId, this.intermediarioId).subscribe(
              data => {
                if (data && data.length > 0) {
                  this.donadores = data;
                  this.showMessage('Donadores cargados correctamente.', 'success');
                } else {
                  this.donadores = [];
                  this.showMessage('Centro e intermediario encontrados, pero no hay donadores registrados.', 'warning');
                }
              },
              error => {
                this.donadores = [];
                this.showMessage('Error al cargar los donadores.', 'danger');
              }
            );
          } else {
            this.donadores = [];
            this.formDisabled = true;
            this.showMessage('Centro o intermediario no encontrado.', 'danger');
          }
        },
        error => {
          this.donadores = [];
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

  refreshDonadoresList(): void {
    this.loadDonadores();
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 5000); // Eliminar mensaje después de 5 segundos
  }
}
