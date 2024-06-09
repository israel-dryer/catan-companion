import {Component, inject} from '@angular/core';
import {
  IonBackButton, IonButton,
  IonButtons, IonCheckbox,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonItem, IonLabel,
  IonList, IonNote,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {liveQuery} from "dexie";
import {GameService} from "../../services/game.service";
import {AsyncPipe, DatePipe} from "@angular/common";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-purge-game-data',
  templateUrl: './purge-game-data.page.html',
  styleUrls: ['./purge-game-data.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    AsyncPipe,
    IonList,
    IonItem,
    IonCheckbox,
    IonLabel,
    IonNote,
    DatePipe,
    IonFooter,
    IonButton,
    IonIcon
  ]
})
export class PurgeGameDataPage {

  private gameService = inject(GameService);
  private toastController = inject(ToastController);

  $games = liveQuery(() => this.gameService.selectGames());
  isAllToggled = false;


  toggleAllRecords() {
    this.isAllToggled = !this.isAllToggled;
    document.querySelectorAll('ion-checkbox').forEach(cb => cb.checked = this.isAllToggled);
  }

  deleteGames() {
    const checkboxes = document.querySelectorAll<HTMLInputElement>('ion-checkbox[aria-checked="true"]');
    checkboxes.forEach(cb => {
      const gameId = Number(cb.value);
      this.gameService.deleteGame(gameId);
    });
  }

}
