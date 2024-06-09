import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {liveQuery} from "dexie";
import {
  IonAlert,
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonItem, IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-players',
  templateUrl: './edit-players.page.html',
  styleUrls: ['./edit-players.page.scss'],
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
    IonLabel,
    IonButton,
    IonIcon,
    IonAlert,
    IonFooter
  ]
})
export class EditPlayersPage {

  private playerService = inject(PlayerService);
  $currentPlayers = liveQuery(() => this.playerService.selectPlayers());
  addPlayerInputs = [{placeholder: 'Enter a username', name: 'name', value: ''}];

  async addNewPlayer({detail}: { detail: Record<string, any> }) {
    if (!detail.data?.values) {
      return;
    }
    const name = detail.data.values?.name;
    if (name) {
      await this.playerService.insertPlayer(name);
    }
    this.addPlayerInputs = [{placeholder: 'Enter a player', name: 'name', value: ''}];
  }

  removePlayer(name: string) {
    return this.playerService.deletePlayer(name);
  }
}
