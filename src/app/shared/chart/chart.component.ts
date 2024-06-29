import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgStyle} from "@angular/common";

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    standalone: true,
  imports: [
    AsyncPipe,
    NgStyle
  ]
})
export class ChartComponent {

  @Input({required: true}) chartData!: {highestRoll: number, rolls: number[]};
  @Input() backgroundChart = false;

}
