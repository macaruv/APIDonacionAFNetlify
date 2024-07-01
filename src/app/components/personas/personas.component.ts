import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/persona.service';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { Persona } from '../../models/persona.model';
import { FormsModule } from '@angular/forms';
import { EmailFormComponent } from "../email-form/email-form.component";

@Component({
    selector: 'app-personas',
    standalone: true,
    templateUrl: './personas.component.html',
    styleUrls: ['./personas.component.css'],
    imports: [CommonModule, FormsModule, PersonaFormComponent, EmailFormComponent]
})
export class PersonasComponent implements OnInit {
  personas: Persona[] = [];
  donadores: Persona[] = [];
  beneficiarios: Persona[] = [];

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getAllPersonas().subscribe(data => {
      this.personas = data;
      this.donadores = this.personas.filter(persona => persona.Rol === 'Donador');
      this.beneficiarios = this.personas.filter(persona => persona.Rol === 'Beneficiario');
    });
  }
}
