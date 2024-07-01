import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Intermediario } from '../../models/intermediario.model';
import { IntermediarioService } from '../../services/intermediario.service';

@Component({
  selector: 'app-intermediarios-form',
  standalone: true,
  templateUrl: './intermediarios-form.component.html',
  styleUrls: ['./intermediarios-form.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IntermediarioFormComponent {
  @Input() centroId!: number;
  @Input() disabled: boolean = false; // Nueva propiedad de entrada
  @Output() refreshList = new EventEmitter<void>();
  intermediario: Intermediario = new Intermediario(0, '', '', '', 0);
  message: string | null = null;
  messageType: string = 'success';

  constructor(private intermediarioService: IntermediarioService) { }

  onSubmit(): void {
    if (this.disabled) return; // No hacer nada si está deshabilitado
    if (this.intermediario.id) {
      this.intermediarioService.updateIntermediario(this.centroId, this.intermediario.id, this.intermediario).subscribe(
        () => {
          this.refreshList.emit();
          this.intermediario = new Intermediario(0, '', '', '', 0);
          this.showMessage('Intermediario actualizado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al actualizar el intermediario.', 'danger');
        }
      );
    } else {
      this.intermediarioService.createIntermediario(this.centroId, this.intermediario).subscribe(
        () => {
          this.refreshList.emit();
          this.intermediario = new Intermediario(0, '', '', '', 0);
          this.showMessage('Intermediario creado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al crear el intermediario.', 'danger');
        }
      );
    }
  }

  loadIntermediario(): void {
    if (this.disabled) return; // No hacer nada si está deshabilitado
    if (this.intermediario.id) {
      this.intermediarioService.getIntermediario(this.centroId, this.intermediario.id).subscribe(
        data => {
          this.intermediario = data;
          this.showMessage('Intermediario encontrado.', 'success');
        },
        () => {
          this.showMessage('Error al cargar el intermediario.', 'danger');
        }
      );
    }
  }

  deleteIntermediario(): void {
    if (this.disabled) return; // No hacer nada si está deshabilitado
    if (this.intermediario.id) {
      this.intermediarioService.deleteIntermediario(this.centroId, this.intermediario.id).subscribe(
        () => {
          this.refreshList.emit();
          this.intermediario = new Intermediario(0, '', '', '', 0);
          this.showMessage('Intermediario eliminado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al eliminar el intermediario.', 'danger');
        }
      );
    }
  }

  resetForm(): void {
    this.intermediario = new Intermediario(0, '', '', '', 0);
    this.message = null;
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 4000); // Eliminar mensaje después de 3 segundos
  }
}
