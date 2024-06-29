import {Component, inject, Input, OnInit} from '@angular/core';
import {GameService} from "../../../services/game.service";
import {from, map, Observable} from "rxjs";
import {IonAlert, IonFab, IonFabButton, IonIcon, IonText} from "@ionic/angular/standalone";
import {AsyncPipe, NgIf, NgStyle} from "@angular/common";
import {liveQuery} from "dexie";
import {ChartComponent} from "../../../shared/chart/chart.component";
import {filter} from "ionicons/icons";

@Component({
  standalone: true,
  selector: 'app-report-histogram',
  templateUrl: './report-histogram.component.html',
  styleUrls: ['./report-histogram.component.scss'],
  imports: [IonText, NgStyle, AsyncPipe, IonFab, IonFabButton, IonIcon, IonAlert, NgIf, ChartComponent]
})
export class ReportHistogramComponent  implements OnInit {

  @Input({required: true}) gameId!: number;
  $chartData!: Observable<{highestRoll: number, rolls: number[]}>
  $players!: Observable<{label: string, type: string, value: string}[]>;
  private gameService = inject(GameService);
  filteredData: number[] = [];

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

    this.$players = from(liveQuery(() => this.gameService.selectGame(this.gameId))).pipe(
      map(game => {
        if (game) {
          return game?.roster.map(p => ({label: p, type: 'radio', value: p}))
        } else {
          return [];
        }

      })
    )
  }

  playerSelected = async (player: string) => {
    const game = await this.gameService.selectGame(this.gameId);
    if (game) {
      const data = Array.from({length: 11}, () => 0)
      game.rolls.forEach(roll => {
        if (roll.player !== player) { return; }
        const index = roll.total - 2;
        data[index] += 1;
      });
      this.filteredData = data;
    }
  }

  clearFilter = () => {
    this.filteredData = [];
  }


  protected readonly filter = filter;
}
