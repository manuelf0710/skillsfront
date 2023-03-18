import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PersonasService } from '../../services/personas.service';
import { IndraSimpleModalInfoComponent } from 'src/app/shared/components/indra-simple-modal-info/indra-simple-modal-info.component';
import { PersonaskillComponent } from 'src/app/shared/components/personaskill/personaskill.component';
import { Persona } from 'src/app/interfaces/persona';
import { Skill } from 'src/app/interfaces/skill';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.scss'],
})
export class PersonasListComponent implements OnInit {
  personasList!: MatTableDataSource<Persona>;
  searchForm!: FormGroup;
  displayedColumns: string[] = [
    'codigo',
    'nombres',
    'apellidos',
    'correo_corporativo',
    'correo_personal',
    'practicas',
    'proyectos',
    'roles',
    'skills',
  ];

  urlProyectos = `${environment.apiUrl}${environment.proyectos.getProyectosSearch}`;
  urlPracticas = `${environment.apiUrl}${environment.practicas.getPracticasSearch}`;
  urlSkills = `${environment.apiUrl}${environment.skills.getSkillsSearch}`;
  urlRoles = `${environment.apiUrl}${environment.roles.getRolesSearch}`;

  //options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];

  filtros = { proyectos: [], practicas: [], roles: [], skills: [] };

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    private _PersonaService: PersonasService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadPersonas();
  }

  private buildForm() {
    this.searchForm = this.FormBuilder.group({
      profesionalsearch: [''],
      fechacitasearch: [''],
      fechacitadatesearch: [''],
    });
  }

  loadPersonas() {
    this._PersonaService
      .getPersonas(this.filtros)
      .pipe(
        tap((res) => {
          console.log('valor de la respuesta => ', res);
          this.personasList = res['data'];
          console.log(this.personasList);
        }),
        catchError((error) => {
          console.log('ha ocurrido un error ');
          console.log('error ', error);
          return [];
        })
      )
      .subscribe();
  }

  convertirDateToString(dateFormat: Date) {
    const dateTo = new Date(dateFormat);
    return `${dateTo.getFullYear()}-${dateTo.getMonth() + 1}-${
      dateTo.getDate() < 10 ? '0' + dateTo.getDate() : dateTo.getDate()
    }`;
  }

  getValuesProyectos(data: any) {
    /*const proyectos = data.map((item: any) => {
      return item.id;
    }); */
    this.filtros.proyectos = data;
  }
  getValuesPracticas(data: any) {
    this.filtros.practicas = data;
  }

  getValuesRoles(data: any) {
    const roles = data.map((item: any) => {
      return item.id;
    });
    this.filtros.roles = roles;
  }

  getValuesSkills(data: any) {
    this.filtros.skills = data;
    console.log('this.filtros.skills => ', this.filtros.skills);
  }

  searchPeople() {
    console.log('this.filtros => ', this.filtros);
    this.loadPersonas();
  }

  openModalSkill(data: Persona) {
    const dialogRef = this.dialog.open(PersonaskillComponent, {
      data: data,
      minWidth: '600px',
      minHeight: '400px',
    });
  }
}
