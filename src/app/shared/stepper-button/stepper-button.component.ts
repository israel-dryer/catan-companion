import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgClass} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-stepper-button',
  templateUrl: './stepper-button.component.html',
  styleUrls: ['./stepper-button.component.scss'],
  imports: [
    IonicModule,
    NgClass
  ]
})
export class StepperButtonComponent {

  @Input() state: 'inactive' | 'active' | 'complete' = 'inactive';

  constructor() {
  }

  get stateStyle() {
    switch (this.state) {
      case 'complete':
        return 'step-complete';
      case 'active':
        return 'step-active';
      default:
        return 'step-inactive';
    }
  }

}
