import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Beneficiario } from '../../models/beneficiario.model';
import { BeneficiarioService } from '../../services/beneficiario.service';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-beneficiario-form',
  standalone: true,
  templateUrl: './beneficiario-form.component.html',
  styleUrls: ['./beneficiario-form.component.css'],
  imports: [CommonModule, FormsModule]
})
export class BeneficiarioFormComponent implements OnInit {
  @Input() centroId!: number;
  @Input() intermediarioId!: number;
  @Input() disabled: boolean = false;
  @Output() refreshList = new EventEmitter<void>();
  beneficiario: Beneficiario = new Beneficiario(0, '', [], 0);
  message: string | null = null;
  messageType: string = 'success';

  personas: Persona[] = [];
  donadores: Persona[] = [];
  beneficiarios: Beneficiario[] = [];

  constructor(
    private beneficiarioService: BeneficiarioService, 
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.loadPersonas();
    this.loadDonadores();
  }

  loadPersonas(): void {
    this.personaService.getPersonasPorRol('Beneficiario').subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.personas = data;
          this.loadBeneficiarios();
        } else {
          this.personas = [];
          this.showMessage('No se encontraron personas con el rol de beneficiario.', 'warning');
        }
      },
      error => {
        this.personas = [];
        this.showMessage('Error al cargar las personas.', 'danger');
      }
    );
  }

  loadDonadores(): void {
    this.personaService.getPersonasPorRol('Donador').subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.donadores = data;
        } else {
          this.donadores = [];
          this.showMessage('No se encontraron donadores.', 'warning');
        }
      },
      error => {
        this.donadores = [];
        this.showMessage('Error al cargar los donadores.', 'danger');
      }
    );
  }

  loadBeneficiarios(): void {
    this.beneficiarioService.getBeneficiarios(this.centroId, this.intermediarioId).subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.beneficiarios = data;
          this.filterPersonas();
        } else {
          this.beneficiarios = [];
        }
      },
      error => {
        this.beneficiarios = [];
        this.showMessage('Error al cargar los beneficiarios.', 'danger');
      }
    );
  }

  filterPersonas(): void {
    const beneficiarioIds = this.beneficiarios.map(beneficiario => beneficiario.PersonaId);
    this.personas = this.personas.filter(persona => !beneficiarioIds.includes(persona.id ?? 0));
  }

  onDonadorChange(id: number | undefined, event: any): void {
    if (id === undefined) return;
    const checked = event.target.checked;
    if (checked) {
      if (!this.beneficiario.DonadorIds.includes(id)) {
        this.beneficiario.DonadorIds.push(id);
      }
    } else {
      const index = this.beneficiario.DonadorIds.indexOf(id);
      if (index > -1) {
        this.beneficiario.DonadorIds.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    if (this.disabled) return;
  
    const existingBeneficiario = this.beneficiarios.find(beneficiario => beneficiario.PersonaId === this.beneficiario.PersonaId && beneficiario.id !== this.beneficiario.id);
    if (existingBeneficiario) {
      this.showMessage('Ya existe un beneficiario con este ID de Persona.', 'warning');
      return;
    }
  
    if (this.beneficiario.id) {
      this.beneficiarioService.updateBeneficiario(this.centroId, this.intermediarioId, this.beneficiario.id, this.beneficiario).subscribe(
        () => {
          this.refreshList.emit();
          this.resetForm();
          this.showMessage('Beneficiario actualizado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al actualizar el beneficiario.', 'danger');
        }
      );
    } else {
      this.beneficiarioService.createBeneficiario(this.centroId, this.intermediarioId, this.beneficiario).subscribe(
        () => {
          this.refreshList.emit();
          this.resetForm();
          this.showMessage('Beneficiario creado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al crear el beneficiario.', 'danger');
        }
      );
    }
  }
  

  loadBeneficiario(): void {
    if (this.disabled) return;
    if (this.beneficiario.id) {
      this.beneficiarioService.getBeneficiario(this.centroId, this.intermediarioId, this.beneficiario.id).subscribe(
        data => {
          if (data) {
            this.beneficiario = data;
            this.updateDonadoresCheckbox();
            this.showMessage('Beneficiario encontrado.', 'success');
          } else {
            this.showMessage('Beneficiario no encontrado.', 'warning');
          }
        },
        () => {
          this.showMessage('Error al cargar el beneficiario.', 'danger');
        }
      );
    }
  }
  
  private updateDonadoresCheckbox(): void {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = this.beneficiario.DonadorIds.includes(parseInt(checkbox.value));
    });
  }
  

  deleteBeneficiario(): void {
    if (this.disabled) return;
    if (this.beneficiario.id) {
      this.beneficiarioService.deleteBeneficiario(this.centroId, this.intermediarioId, this.beneficiario.id).subscribe(
        () => {
          this.refreshList.emit();
          this.resetForm();
          this.showMessage('Beneficiario eliminado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al eliminar el beneficiario.', 'danger');
        }
      );
    }
  }

  resetForm(): void {
    this.beneficiario = new Beneficiario(0, '', [], 0);
    this.message = null;
    this.resetDonadoresCheckbox();
  }

  private resetDonadoresCheckbox(): void {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = null, 3000);
  }
}
