import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {KeepAwake} from "@capacitor-community/keep-awake";
import {
  IonActionSheet,
  IonButton,
  IonContent, IonFooter, IonHeader,
  IonIcon,
  IonNote,
  IonText, IonToolbar,
  ViewWillEnter, ViewWillLeave
} from '@ionic/angular/standalone';
import {DiceComponent} from "../../shared/dice/dice.component";
import {PlayService} from "../../services/play.service";
import {AlertController} from "@ionic/angular";
import {Router, RouterLink} from "@angular/router";
import {SettingService} from "../../services/setting.service";
import {liveQuery} from "dexie";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {ActionDiceComponent} from "../../shared/action-dice/action-dice.component";

const ROLL_DURATION = 750;

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonNote,
    IonText,
    DiceComponent,
    AsyncPipe,
    IonButton,
    RouterLink,
    IonIcon,
    IonActionSheet,
    ActionDiceComponent,
    IonFooter,
    IonHeader,
    IonToolbar
  ],
  animations: [
    trigger('jiggleRed', [
      state('active', style({})),
      transition("* => active", [
        animate(`${ROLL_DURATION}ms`, keyframes([
          style({transform: 'translate3d(0, 0, 0) rotate(0deg)'}),
          style({transform: 'translate3d(-1px, 0, 0) rotate(-5deg)'}),
          style({transform: 'translate3d(2px, 0, 0) rotate(0deg)'}),
          style({transform: 'translate3d(-4px, 0, 0)'}),
          style({transform: 'translate3d(4px, 0, 0) rotate(5deg)'}),
          style({transform: 'translate3d(1px, 0, 0) rotate(5deg)'}),
          style({transform: 'translate3d(-2px, 0, 0) rotate(0deg)'}),
          style({transform: 'translate3d(4px, 0, 0)'}),
        ]))
      ])
    ]),
    trigger('jiggleGold', [
      state('active', style({})),
      transition("* => active", [
        animate(`${ROLL_DURATION}ms`, keyframes([
          style({transform: 'translate3d(0, 0, 0) rotate(0deg)'}),
          style({transform: 'translate3d(1px, 0, 0) rotate(5deg)'}),
          style({transform: 'translate3d(-2px, 0, 0) rotate(0deg)'}),
          style({transform: 'translate3d(4px, 0, 0)'}),
          style({transform: 'translate3d(-4px, 0, 0) rotate(-5deg)'}),
          style({transform: 'translate3d(1px, 0, 0) rotate(5deg)'}),
          style({transform: 'translate3d(-2px, 0, 0) rotate(0deg)'}),
          style({transform: 'translate3d(4px, 0, 0)'}),
        ]))
      ])
    ])
  ]
})
export class PlayPage implements ViewWillEnter, ViewWillLeave {

  private alertController = inject(AlertController);
  private settingsService = inject(SettingService);
  private router = inject(Router);
  isRolling = false;
  playService = inject(PlayService);
  $showDiceTotal = liveQuery(() => this.settingsService.get('showDiceTotal'));

  actionSheetButtons = [
    {
      text: 'Undo last roll',
      icon: 'arrow-undo',
      data: {action: 'undo'},
    },
    {
      text: 'End game',
      icon: 'trophy',
      data: {action: 'end'},
    },
    {
      text: 'History',
      icon: 'timer',
      data: {action: 'history'},
    },
    {
      text: 'Settings',
      icon: 'options',
      data: {action: 'settings'},
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: 'close',
      data: {action: 'cancel'},
    },
  ]

  get lastRoll() {
    return this.playService.activeGame?.rolls.at(-1);
  }

  get activeGame() {
    return this.playService.activeGame;
  }

  async ionViewWillEnter() {
    KeepAwake.isSupported().then(async result => {
      if (result.isSupported) {
        await KeepAwake.keepAwake();
      }
    });
  }

  async ionViewWillLeave() {
    KeepAwake.isSupported().then(async result => {
      if (result.isSupported) {
        await KeepAwake.allowSleep();
      }
    })
  }

  async rollDice() {
    if (this.playService.currPlayer && !this.isRolling) {
      this.isRolling = true; // prevents roll spamming
      await this.playService.roll();
      setTimeout(() => this.isRolling = false, ROLL_DURATION);
    }
  }

  async closeActionSheet(e: any) {
    switch (e.detail.data?.action) {
      case 'undo':
        await this.undoLastRoll();
        break;
      case 'end':
        await this.endGame();
        break;
      case 'settings':
        await this.router.navigate(['settings']);
        break;
      case 'history':
        await this.router.navigate(['history']);
        break;
      default:
        break;
    }
  }

  // action sheet commands
  async endGame() {
    const alert = await this.alertController.create({
      message: 'Choose a winner (optional)',
      buttons: [{text: 'Cancel', role: 'cancel'}, {text: 'Confirm', role: 'confirm'}],
      inputs: this.playService.activeGame!.roster.map(player => ({label: player, type: 'radio', value: player}))
    });
    alert.onDidDismiss().then(async event => {
      if (event.role === 'cancel') {
        return;
      } else {
        const winner = event.data.values;
        // end active game, then navigate to home;
        await this.playService.endActiveGame(winner);
        await this.router.navigate(['home']);
      }
    })
    await alert.present();
  }

  async undoLastRoll() {
    await this.playService.undoLastRoll();
  }

}
