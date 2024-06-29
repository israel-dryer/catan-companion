import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-stepper-connector',
  templateUrl: './stepper-connector.component.html',
  styleUrls: ['./stepper-connector.component.scss'],
  standalone: true,
  imports: [
    NgClass
  ]
})
export class StepperConnectorComponent {

  @Input() state: 'active' | 'inactive' | 'complete' = 'inactive';

  constructor() {
  }

  get stateStyle() {
    switch (this.state) {
      case 'complete':
        return 'step-line-complete';
      default:
        return 'step-line-inactive';
    }
  }

}
