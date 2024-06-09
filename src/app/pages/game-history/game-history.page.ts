import {Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel,
  IonList, IonNote, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {GameService} from "../../services/game.service";
import {liveQuery} from "dexie";

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.page.html',
  styleUrls: ['./game-history.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    AsyncPipe,
    IonItem,
    RouterLink,
    IonLabel,
    IonText,
    IonNote,
    DatePipe,
    DecimalPipe,
    IonIcon
  ]
})
export class GameHistoryPage  {

  private gameService = inject(GameService);

  // sort by date created
  $games = liveQuery(
    () => this.gameService.selectGames()
      .then(games => games.sort((a, b) => b.id - a.id))
  );

}
