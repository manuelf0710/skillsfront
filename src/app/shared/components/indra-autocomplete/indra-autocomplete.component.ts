import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
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

interface User {
  id?: number;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-indra-autocomplete',
  templateUrl: './indra-autocomplete.component.html',
  styleUrls: ['./indra-autocomplete.component.scss'],
})
export class IndraAutocompleteComponent implements OnInit {
  @Input() apiUrl!: string;
  @Input() label = 'Buscar';
  @Output() valueChange = new EventEmitter<User[]>();
  myControl = new FormControl<string | User>('');
  options: User[] = [];
  filteredOptions: Observable<User[]> | undefined;
  selectedOptions: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
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
  }

  searchUsers(value: string): Observable<User[]> {
    const url = this.apiUrl + '?q=' + value;
    return this.http.get<User[]>(url).pipe(delay(500));
  }

  fetchData() {
    // Realiza la petición HTTP a la API y actualiza la lista de opciones disponibles
    fetch(this.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.options = data;
      });
  }

  filter(name: string): User[] {
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }

  addChip(event: any) {
    const selectedOption = event.option.value;
    if (
      !this.selectedOptions.some((option) => option.id === selectedOption.id)
    ) {
      this.selectedOptions.push(selectedOption);
      this.valueChange.emit(this.selectedOptions); // Emitir el evento de salida
      this.myControl.setValue(null);
    }
  }

  removeChip(option: User) {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
      this.valueChange.emit(this.selectedOptions); // Emitir el evento de salida
    }
  }
}
