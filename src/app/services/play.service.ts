import {inject, Injectable, OnDestroy} from '@angular/core';
import {GameService} from "./game.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {Game} from "./storage.service";
import {CurrentService} from "./current.service";
import {liveQuery} from "dexie";
import {AudioService} from "./audio.service";
import {Haptics, ImpactStyle} from "@capacitor/haptics";
import {SettingService} from "./setting.service";

@Injectable({
  providedIn: 'root'
})
export class PlayService implements OnDestroy {

  private activeGameSub: any;
  private hapticsEnabledSub: any;

  private gameService = inject(GameService);
  private audioService = inject(AudioService);
  private currentService = inject(CurrentService);
  private settingsService = inject(SettingService);

  private router = inject(Router);
  private alertController = inject(AlertController);
  private hapticsEnabled = false;

  activeGame?: Game | undefined;
  activeGameId?: number | undefined;

  constructor() {

    this.hapticsEnabledSub = liveQuery(() => this.settingsService.get('hapticsEnabled')).subscribe(setting => this.hapticsEnabled = setting?.value ?? false);
    this.activeGameSub = liveQuery(() => this.currentService.getCurrentItem('activeGameId')).subscribe(async current => {
      this.activeGameId = current?.value;
      if (this.activeGameId) {
        this.activeGame = await this.gameService.selectGame(this.activeGameId);
      }
    });
  }

  ngOnDestroy(): void {
    this.activeGameSub.unsubscribe();
    this.hapticsEnabledSub.unsubscribe();
  }

  get prevPlayer() {
    if (this.activeGame) {
      const index = this.prevTurnIndex();
      return this.activeGame.roster[index];
    }
    return
  }

  get currPlayer() {
    if (this.activeGame) {
      return this.activeGame.roster[this.activeGame.turnIndex];
    }
    return '';
  }

  async startGame(game: Game) {
    await this.gameService.insertGame(game);
    this.currentService.setCurrentItem('activeGameId', game.id);
    await this.showPlaceSettlementsAlert(game);
    await this.router.navigate(['play'])
  }

  async endActiveGame(winner?: string) {
    if (this.activeGame && winner) {
      this.activeGame.winner = winner;
      await this.gameService.updateGame(this.activeGame);
    }
    this.currentService.deleteCurrentItem('activeGameId');
  }

  async roll() {
    if (this.hapticsEnabled) {
      await Haptics.impact({style: ImpactStyle.Heavy});
    }
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const action = this.activeGame?.citiesAndKnights ? this.getCitiesAndKnightsActivity() : undefined;
    const total = dice1 + dice2;

    await this.audioService.playDiceSound();

    if (this.activeGame) {
      this.activeGame.rolls.push({
        id: Math.random(),
        dice1,
        dice2,
        total,
        action,
        player: this.currPlayer,
        timestamp: Date.now(),
      });
      this.activeGame.turnIndex = this.nextTurnIndex();
      this.gameService.updateGame(this.activeGame);

      if (total === 7 && this.audioService.robberSoundEnabled) {
        setTimeout(async () => {
          await this.audioService.playRobberSound();
        }, 500);
      } else {
        setTimeout(async () => {
          this.audioService.speakResult(total);
        }, 500);
      }
    }
    return {dice1, dice2, total};
  }

  getCitiesAndKnightsActivity() {
    const options = ['BAR', 'GLD', 'BAR', 'BLU', 'BAR', 'GRN'];
    const index = Math.floor(Math.random() * options.length);
    return options[index];
  }

  async undoLastRoll() {
    if (this.activeGame && this.activeGame?.rolls.length) {
      this.activeGame.rolls.pop();
      this.activeGame.turnIndex = this.prevTurnIndex();
      await this.gameService.updateGame(this.activeGame);
    }
  }

  private nextTurnIndex() {
    if (this.activeGame) {
      const maxIndex = this.activeGame.roster.length - 1;
      const curIndex = this.activeGame.turnIndex;
      let nextIndex = curIndex + 1;
      return nextIndex <= maxIndex ? nextIndex : 0;
    }
    return 0;
  }

  private prevTurnIndex() {
    if (this.activeGame) {
      const curIndex = this.activeGame.turnIndex;
      let prevIndex = this.activeGame.turnIndex - 1;
      return prevIndex >= 0 ? prevIndex : this.activeGame.roster.length - 1;
    }
    return 0;
  }

  private showPlaceSettlementsAlert = async (game: Game) => {
    const index = game.turnIndex;
    const alert = await this.alertController.create({
      header: "Place Settlements",
      message: game.roster[index].toUpperCase() + " is first. Click START when all players have placed their settlements",
      buttons: ["Start"]
    });
    return alert.present();
  }

}
