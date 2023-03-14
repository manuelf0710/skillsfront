import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  tap,
  catchError,
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  delay,
} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { PersonasService } from '../../services/personas.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Practica {
  id: number;
  codigo_practica: String;
  nombre_practica: String;
}
export interface Proyecto {
  id: number;
  codigo_proyecto: String;
  nombre_proyecto: String;
}
export interface Skill {
  id: number;
  codigo_skill: String;
  nombre_skill: String;
  descripcion: String;
}

export interface Persona {
  id: number;
  codigo_persona: String;
  nombre_persona: String;
  apellido_persona: String;
  correo_corporativo: String;
  correo_personal: String;
  pais: String;
  ciudad: String;
  estado: number;
  fecha_retiro: Date;
  estado_laboral_desc: String;
  fecha_ingreso: Date;
  fecha_nacimiento: Date;
  genero: String;
  ciudad_residencia: String;
  estado_civil: number;
  cantidad_hijos: number;
  direccion_residencia: String;
  practicas?: any[];
  proyectos?: any[];
  skills?: any[];
  roles?: any[];
}

export interface User {
  codigo?: string;
  name: string;
  descripcion?: string;
}

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
  displayedColumns2: string[] = [
    'profesional',
    'fechacita',
    'horacita',
    'action',
  ];
  profesionalsearch = '';
  fechacitasearch = '';
  fechacitadatesearch = '';
  urlProyectos = `${environment.apiUrl}${environment.proyectos.getProyectosSearch}`;
  urlPracticas = `${environment.apiUrl}${environment.practicas.getPracticasSearch}`;
  urlSkills = `${environment.apiUrl}${environment.skills.getSkillsSearch}`;
  urlRoles = `${environment.apiUrl}${environment.roles.getRolesSearch}`;

  myControl = new FormControl<string | User>('');
  //options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  options: User[] = [];
  filteredOptions!: Observable<User[]>;

  filtros = { proyectos: [], practicas: [], roles: [], skills: [] };

  selectedOptions: any[] = [];

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private _PersonaService: PersonasService
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => {
        if (typeof value === 'string' && value.length >= 3) {
          return this.searchUsers(value);
        } else {
          return of([]);
        }
      })
    );
    this.buildForm();
    this.loadPersonas();
    console.log('hace algo');
  }

  searchUsers(value: string): Observable<User[]> {
    const url =
      environment.apiUrl +
      '' +
      environment.proyectos.getProyectosSearch +
      '?q=' +
      value;
    return this.http.get<User[]>(url).pipe(delay(500));
  }
  private buildForm() {
    this.searchForm = this.FormBuilder.group({
      profesionalsearch: [''],
      fechacitasearch: [''],
      fechacitadatesearch: [''],
    });
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
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

  applyFilter() {
    const date = this.searchForm.get('fechacitadatesearch')?.value;
    const as = this.searchForm.get('profesionalsearch')?.value;
    const ds = this.searchForm.get('fechacitasearch')?.value;

    this.fechacitadatesearch =
      date === null || date === '' ? '' : date.toDateString();
    this.profesionalsearch = as === null ? '' : as;
    this.fechacitasearch = ds === null ? '' : ds;

    // create string of our searching values and split if by '$'
    const filterValue =
      this.fechacitadatesearch +
      '$' +
      this.profesionalsearch +
      '$' +
      this.fechacitasearch;
    this.personasList.filter = filterValue.trim().toLowerCase();
  }

  convertirDateToString(dateFormat: Date) {
    const dateTo = new Date(dateFormat);
    return `${dateTo.getFullYear()}-${dateTo.getMonth() + 1}-${
      dateTo.getDate() < 10 ? '0' + dateTo.getDate() : dateTo.getDate()
    }`;
  }
  addChip(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.selectedOptions.push(event.option.value);
    this.myControl?.setValue(null);
  }

  removeChip(option: any): void {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
  }

  getValuesProyectos(data: any) {
    const proyectos = data.map((item: any) => {
      return item.id;
    });
    this.filtros.proyectos = proyectos;
  }
  getValuesPracticas(data: any) {
    const practicas = data.map((item: any) => {
      return item.id;
    });
    this.filtros.practicas = practicas;
  }

  getValuesRoles(data: any) {
    const roles = data.map((item: any) => {
      return item.id;
    });
    this.filtros.roles = roles;
  }

  getValuesSkills(data: any) {
    const skills = data.map((item: any) => {
      return item.id;
    });
    this.filtros.skills = skills;
  }

  searchPeople() {
    this.loadPersonas();
  }
}
