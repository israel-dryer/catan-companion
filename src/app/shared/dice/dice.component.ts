import {AfterViewInit, Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  imports: [
    NgStyle
  ]
})
export class DiceComponent implements AfterViewInit {

  @Input({required: true}) number!: number;
  @Input({required: true}) color!: 'red' | 'gold';
  red: string = '';
  gold: string = '';

  constructor() {
  }

  ngAfterViewInit() {
    this.red = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-danger');
    this.gold = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-warning');
  }

  get dieColor() {
    return this.color === 'red' ? this.red : this.gold;
  }

  get dotColor() {
    return this.color === 'red' ? this.gold : this.red;
  }


}
