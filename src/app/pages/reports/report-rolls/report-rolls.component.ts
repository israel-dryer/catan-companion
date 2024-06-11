import {Component, inject, Input} from '@angular/core';
import {GameService} from "../../../services/game.service";
import {liveQuery} from "dexie";
import {AsyncPipe} from "@angular/common";
import {from, map} from "rxjs";
import {IonContent, IonItem, IonLabel, IonList} from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-report-rolls',
  templateUrl: './report-rolls.component.html',
  styleUrls: ['./report-rolls.component.scss'],
  imports: [
    AsyncPipe,
    IonContent,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class ReportRollsComponent {

  constructor() { }

  @Input({required: true}) gameId!: number;
  private gameService = inject(GameService);
  $rolls = from(liveQuery(() => this.gameService.selectGame(this.gameId))).pipe(
    map(game => {
      const rolls = game?.rolls ?? [];
      const tableData: {roll: number, total: number, dice1: number, dice2: number, action?: string, player: string}[] = [];
      rolls.forEach((roll, index, _) => {
        tableData.push({roll: index + 1, total: roll.total, dice1: roll.dice1, dice2: roll.dice2, action: roll.action, player: roll.player});
      });
      tableData.sort((a, b) => b.roll - a.roll);
      return tableData;
    })
  );

}
