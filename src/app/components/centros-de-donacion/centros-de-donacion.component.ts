import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentroDeDonacionService } from '../../services/centro-de-donacion.service';
import { CentroDeDonacionFormComponent } from '../centro-de-donacion-form/centro-de-donacion-form.component';
import { CentroDeDonacion } from '../../models/centro-de-donacion.model'; // Importar CentroDeDonacion

@Component({
  selector: 'app-centros-de-donacion',
  standalone: true,
  templateUrl: './centros-de-donacion.component.html',
  styleUrls: ['./centros-de-donacion.component.css'],
  imports: [CommonModule, CentroDeDonacionFormComponent]
})
export class CentrosDeDonacionComponent implements OnInit {
  centros: CentroDeDonacion[] = [];

  constructor(private centroService: CentroDeDonacionService) { }

  ngOnInit(): void {
    this.loadCentros();
  }

  loadCentros(): void {
    this.centroService.getCentrosDeDonacion().subscribe(data => {
      this.centros = data;
    });
  }
}
