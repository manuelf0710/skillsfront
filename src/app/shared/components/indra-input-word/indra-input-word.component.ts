import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

export interface Fruit {
  name: string;
  mandatory?: boolean;
}
@Component({
  selector: 'app-indra-input-word',
  templateUrl: './indra-input-word.component.html',
  styleUrls: ['./indra-input-word.component.scss'],
})
export class IndraInputWordComponent {
  @Input() label = 'Item';
  @Output() valueChange = new EventEmitter<Fruit[]>();
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push({ name: value, mandatory: false });
    }
    event.chipInput!.clear();
    this.valueChange.emit(this.fruits); // Emitir el evento de salida
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
    this.valueChange.emit(this.fruits); // Emitir el evento de salida
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(fruit);
      return;
    }
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
    this.valueChange.emit(this.fruits);
  }
  toggleAccent(fruit: Fruit) {
    fruit.mandatory = !fruit.mandatory;
  }
}
