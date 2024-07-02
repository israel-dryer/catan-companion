import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NumberPickerComponent  {

  private _value = 1;
  @Input() color = 'primary';

  constructor() { }

  increment = () => {
    this.value = this.value + 1;
  }

  decrement = () => {
    this.value = this.value - 1;
  }

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = Math.max((Math.min(value, 6)), 1);
  }

}
