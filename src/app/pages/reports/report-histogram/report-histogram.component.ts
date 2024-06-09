import {Component, inject, Input, OnInit} from '@angular/core';
import {GameService} from "../../../services/game.service";
import {from, map, Observable} from "rxjs";
import {IonText} from "@ionic/angular/standalone";
import {AsyncPipe, NgStyle} from "@angular/common";
import {liveQuery} from "dexie";

@Component({
  standalone: true,
  selector: 'app-report-histogram',
  templateUrl: './report-histogram.component.html',
  styleUrls: ['./report-histogram.component.scss'],
  imports: [IonText, NgStyle, AsyncPipe]
})
export class ReportHistogramComponent  implements OnInit {

  @Input({required: true}) gameId!: number;
  $chartData!: Observable<{highestRoll: number, rolls: number[]}>
  private gameService = inject(GameService);

  ngOnInit() {
    this.$chartData = from(liveQuery(() => this.gameService.selectGame(this.gameId))).pipe(
      map(game => {
        if (game) {
          let highestRoll = 0;
          const data = Array.from({length: 11}, () => 0)
          game.rolls.forEach(roll => {
            const index = roll.total - 2;
            data[index] += 1;
          });
          highestRoll = Math.max(...data);
          return {highestRoll, rolls: data};
        } else {
          return {highestRoll: 0, rolls: []};
        }
      })
    );
  }

}
