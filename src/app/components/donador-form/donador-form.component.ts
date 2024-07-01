import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Donador } from '../../models/donador.model';
import { DonadorService } from '../../services/donador.service';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-donador-form',
  standalone: true,
  templateUrl: './donador-form.component.html',
  styleUrls: ['./donador-form.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DonadorFormComponent implements OnInit {
  @Input() centroId!: number;
  @Input() intermediarioId!: number;
  @Input() disabled: boolean = false;
  @Output() refreshList = new EventEmitter<void>();
  donador: Donador = new Donador('', [], [], '', [], 0);
  message: string | null = null;
  messageType: string = 'success';

  personas: Persona[] = [];
  beneficiarios: Persona[] = [];
  donadores: Donador[] = [];
  alergiasString: string = '';
  enfermedadesString: string = '';

  constructor(
    private donadorService: DonadorService, 
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.loadPersonas();
    this.loadBeneficiarios();
  }

  loadPersonas(): void {
    this.personaService.getPersonasPorRol('Donador').subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.personas = data;
          this.loadDonadores();
        } else {
          this.personas = [];
          this.showMessage('No se encontraron personas con el rol de donador.', 'warning');
        }
      },
      error => {
        this.personas = [];
        this.showMessage('Error al cargar las personas.', 'danger');
      }
    );
  }

  loadBeneficiarios(): void {
    this.personaService.getPersonasPorRol('Beneficiario').subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.beneficiarios = data;
        } else {
          this.beneficiarios = [];
          this.showMessage('No se encontraron beneficiarios.', 'warning');
        }
      },
      error => {
        this.beneficiarios = [];
        this.showMessage('Error al cargar los beneficiarios.', 'danger');
      }
    );
  }

  loadDonadores(): void {
    this.donadorService.getDonadores(this.centroId, this.intermediarioId).subscribe(
      data => {
        if (data && Array.isArray(data)) {
          this.donadores = data;
          this.filterPersonas();
        } else {
          this.donadores = [];
        }
      },
      error => {
        this.donadores = [];
        this.showMessage('Error al cargar los donadores.', 'danger');
      }
    );
  }

  filterPersonas(): void {
    const donadorIds = this.donadores.map(donador => donador.PersonaId);
    this.personas = this.personas.filter(persona => !donadorIds.includes(persona.id ?? 0));
  }

  onBeneficiarioChange(id: number, event: any): void {
    const checked = event.target.checked;
    if (checked) {
      if (!this.donador.BeneficiarioIds.includes(id)) {
        this.donador.BeneficiarioIds.push(id);
      }
    } else {
      const index = this.donador.BeneficiarioIds.indexOf(id);
      if (index > -1) {
        this.donador.BeneficiarioIds.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    if (this.disabled) return;

    this.donador.Alergias = this.alergiasString.split(',').map(alergia => alergia.trim());
    this.donador.Enfermedades = this.enfermedadesString.split(',').map(enfermedad => enfermedad.trim());

    const existingDonador = this.donadores.find(donador => donador.PersonaId === this.donador.PersonaId && donador.id !== this.donador.id);
    if (existingDonador) {
      this.showMessage('Ya existe un donador con este ID de Persona.', 'warning');
      return;
    }

    if (this.donador.id) {
      this.donadorService.updateDonador(this.centroId, this.intermediarioId, this.donador.id, this.donador).subscribe(
        () => {
          this.refreshList.emit();
          this.resetForm();
          this.showMessage('Donador actualizado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al actualizar el donador.', 'danger');
        }
      );
    } else {
      this.donadorService.createDonador(this.centroId, this.intermediarioId, this.donador).subscribe(
        () => {
          this.refreshList.emit();
          this.resetForm();
          this.showMessage('Donador creado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al crear el donador.', 'danger');
        }
      );
    }
  }

  loadDonador(): void {
    if (this.disabled) return;
    if (this.donador.id) {
      this.donadorService.getDonador(this.centroId, this.intermediarioId, this.donador.id).subscribe(
        data => {
          if (data) {
            this.donador = data;
            this.alergiasString = this.donador.Alergias.join(', ');
            this.enfermedadesString = this.donador.Enfermedades.join(', ');
            this.updateBeneficiariosCheckbox();
            this.showMessage('Donador encontrado.', 'success');
          } else {
            this.showMessage('Donador no encontrado.', 'warning');
          }
        },
        () => {
          this.showMessage('Error al cargar el donador.', 'danger');
        }
      );
    }
  }

  private updateBeneficiariosCheckbox(): void {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = this.donador.BeneficiarioIds.includes(parseInt(checkbox.value));
    });
  }

  deleteDonador(): void {
    if (this.disabled) return;
    if (this.donador.id) {
      this.donadorService.deleteDonador(this.centroId, this.intermediarioId, this.donador.id).subscribe(
        () => {
          this.refreshList.emit();
          this.resetForm();
          this.showMessage('Donador eliminado correctamente.', 'success');
        },
        () => {
          this.showMessage('Error al eliminar el donador.', 'danger');
        }
      );
    }
  }

  resetForm(): void {
    this.donador = new Donador('', [], [], '', [], 0);
    this.alergiasString = '';
    this.enfermedadesString = '';
    this.message = null;
    this.resetBeneficiariosCheckbox();
  }

  private resetBeneficiariosCheckbox(): void {
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
