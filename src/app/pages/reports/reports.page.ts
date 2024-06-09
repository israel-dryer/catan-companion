import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ReportHistogramComponent} from "./report-histogram/report-histogram.component";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {ReportRollsComponent} from "./report-rolls/report-rolls.component";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButtons,
    IonBackButton,
    ReportHistogramComponent,
    ReportRollsComponent,
    AsyncPipe
  ]
})
export class ReportsPage implements OnInit {

  $gameId?: Observable<number | null>;
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.$gameId = this.route.paramMap.pipe(map(params => Number(params.get('id'))));
  }

}
