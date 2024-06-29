import {Component, inject} from '@angular/core';
import {
  IonContent,
  IonButton,
  IonText,
  IonActionSheet
} from '@ionic/angular/standalone';
import {PlayerService} from "../services/player.service";
import {SettingService} from "../services/setting.service";
import {GameService} from "../services/game.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [PlayerService, SettingService, GameService],
  standalone: true,
  imports: [
    IonContent,
    IonText,
    IonButton,
    RouterLink,
    IonActionSheet
  ],
})
export class HomePage {

  private router = inject(Router);
  message = '';

  actionSheetButtons = [
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
      text: 'About',
      icon: 'information-circle',
      data: {action: 'about'}
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: 'close',
      data: {action: 'cancel'},
    }
  ];

  async closeActionSheet(e: any) {
    switch (e.detail.data?.action) {
      case 'settings':
        await this.router.navigate(['settings']);
        break;
      case 'history':
        await this.router.navigate(['history']);
        break;
      case 'about':
        await this.router.navigate(['about']);
        break;
      default:
        break;
    }
  }

}
