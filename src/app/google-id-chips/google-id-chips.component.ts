import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface ID {
  name: string;
}


@Component({
  selector: 'app-google-id-chips',
  templateUrl: './google-id-chips.component.html',
  styleUrls: ['./google-id-chips.component.scss']
})
export class GoogleIdChipsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  ids: ID[] = [
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add an ID
    if ((value || '').trim()) {
      this.ids.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: ID): void {
    const index = this.ids.indexOf(fruit);

    if (index >= 0) {
      this.ids.splice(index, 1);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
