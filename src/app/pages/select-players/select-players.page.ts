import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {
  IonAccordion, IonAccordionGroup,
  IonAlert, IonBackButton,
  IonButton, IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  IonReorder,
  IonReorderGroup,
  IonSelect,
  IonSelectOption, IonText,
  IonTitle, IonToggle,
  IonToolbar, ViewWillEnter
} from '@ionic/angular/standalone';
import {PlayerService} from "../../services/player.service";
import {PlayService} from "../../services/play.service";
import {liveQuery} from "dexie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-players',
  templateUrl: './select-players.page.html',
  styleUrls: ['./select-players.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonListHeader,
    IonLabel,
    IonText,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonAlert,
    IonReorderGroup,
    IonReorder,
    IonRadioGroup,
    IonRadio,
    IonToggle,
    AsyncPipe,
    IonFooter,
    IonAccordion,
    IonAccordionGroup

  ]
})
export class SelectPlayersPage implements ViewWillEnter {

  roster: string[] = [];
  startingOption: 'random' | 'first' = 'random';
  citiesAndKnights = false;

  private playerService = inject(PlayerService);
  private playService = inject(PlayService);
  private router = inject(Router);

  // display players based on most recently played
  $players = liveQuery(
    () => this.playerService.selectPlayers()
      .then(players => players.sort((a, b) => b.lastPlayed - a.lastPlayed)));

  createPlayerInputs = [{placeholder: 'Enter a username', name: 'name', value: ''}];


  async ionViewWillEnter() {
    const players = await this.playerService.selectPlayers();
    if (players.length < 2) {
      await this.router.navigate(['edit-players', 'onboard']);
    }
  }


  async addPlayer({detail}: { detail: Record<string, any> }) {
    if (!detail.data?.values) {
      return;
    }
    const name = detail.data.values?.name;
    if (name) {
      await this.playerService.insertPlayer(name);
    }
    this.createPlayerInputs = [{placeholder: 'Enter a player', name: 'name', value: ''}];
  }

  async selectAvailablePlayers(e: any) {
    this.roster = e.detail.value;
  }

  startingOptionChanged = (e: any) => {
    this.startingOption = e.detail.value;
  }

  async handlePlayerReorder(e: any) {
    this.roster.splice(e.detail.to, 0, this.roster.splice(e.detail.from, 1)[0]);
    e.detail.complete();
  }

  startGame = async () => {
    // update last played for each player
    this.roster.toReversed().forEach(p => this.playerService.updatePlayer(p));

    // get starting player
    let turnIndex = 0;
    if (this.startingOption === 'random') {
      turnIndex = Math.floor(Math.random() * this.roster.length);
    }
    const game = {
      id: Date.now(),
      roster: this.roster,
      rolls: [],
      turnIndex,
      citiesAndKnights: this.citiesAndKnights
    };
    return this.playService.startGame(game);
  }

  toggleCitiesAndKnights = ({detail}: any) => {
    this.citiesAndKnights = detail.checked;
  }

}
