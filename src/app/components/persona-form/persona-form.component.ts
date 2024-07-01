import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';
import { FileUploadComponent } from '../file-upload/file-upload.component';


@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadComponent],
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent {
  persona: Persona = new Persona();
  @Output() refreshList = new EventEmitter<void>();
  message: string | null = null;
  messageType: string = 'success';

  constructor(private personaService: PersonaService) { }

  onSubmit(): void {
    if (this.persona.id) {
      this.personaService.updatePersona(this.persona.id, this.persona).subscribe(() => {
        this.refreshList.emit();
        this.showMessage('Persona actualizada correctamente.', 'success');
      }, () => {
        this.showMessage('Error al actualizar la persona.', 'danger');
      });
    } else {
      this.personaService.createPersona(this.persona).subscribe(() => {
        this.refreshList.emit();
        this.persona = new Persona();
        this.showMessage('Persona creada correctamente.', 'success');
      }, () => {
        this.showMessage('Error al crear la persona.', 'danger');
      });
    }
  }

  deletePersona(): void {
    if (this.persona.id) {
      this.personaService.deletePersona(this.persona.id).subscribe(() => {
        this.refreshList.emit();
        this.persona = new Persona();
        this.showMessage('Persona eliminada correctamente.', 'success');
      }, () => {
        this.showMessage('Error al eliminar la persona.', 'danger');
      });
    }
  }

  loadPersona(): void {
    if (this.persona.id) {
      this.personaService.getPersona(this.persona.id).subscribe(data => {
        if (data) {
          this.persona = data;
          this.showMessage('Persona encontrada.', 'success');
        } else {
          this.showMessage('Persona no encontrada.', 'warning');
        }
      }, () => {
        this.showMessage('Error al buscar la persona.', 'danger');
      });
    }
  }

  resetForm(): void {
    this.persona = new Persona();
    this.message = null;
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 3000); // Eliminar mensaje después de 3 segundos
  }
}
