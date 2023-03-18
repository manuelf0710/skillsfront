import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { personaSkill } from 'src/app/interfaces/personaSkill';
import { PersonasService } from 'src/app/services/personas.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tap, catchError } from 'rxjs/operators';

import { Persona } from 'src/app/interfaces/persona';

@Component({
  selector: 'app-personaskill',
  templateUrl: './personaskill.component.html',
  styleUrls: ['./personaskill.component.scss'],
})
export class PersonaskillComponent implements OnInit {
  skillList!: MatTableDataSource<personaSkill>;
  persona!: Persona;
  displayedColumns: string[] = [
    'skill',
    'version',
    'tecnologia',
    'fecha_inicio',
    'fecha_fin',
    'anios_experiencia',
    'seniority',
    'experiencia',
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Persona,
    public dialogRef: MatDialogRef<PersonaskillComponent>,
    private _PersonaService: PersonasService
  ) {
    this.persona = data;
  }
  ngOnInit(): void {
    this.loadPersonaSkills(this.persona.id);
  }

  loadPersonaSkills(personaId: number) {
    this._PersonaService
      .getSkillsByPersonaId(personaId)
      .pipe(
        tap((res) => {
          this.skillList = res;
        }),
        catchError((error) => {
          console.log('error ', error);
          return [];
        })
      )
      .subscribe();
  }
}
