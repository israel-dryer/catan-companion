import {AsyncPipe} from '@angular/common';
import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {liveQuery} from "dexie";
import {
  IonAlert,
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonInput, IonItem, IonLabel,
  IonList, IonModal, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {AlertController} from "@ionic/angular";

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
    IonFooter,
    IonText,
    IonModal,
    IonInput
  ]
})
export class EditPlayersPage implements OnInit, OnDestroy {

  private playerService = inject(PlayerService);
  private alertController = inject(AlertController);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private routeSub!: Subscription;
  private isOnboarding = false;
  @ViewChild('nameInput') nameInput!: IonInput;
  $currentPlayers = liveQuery(() => this.playerService.selectPlayers());


  async addNewPlayer(key?: string) {
    if (key !== undefined && key !== 'Enter') {
      return;
    }

    if (this.nameInput.value) {
      await this.playerService.insertPlayer(this.nameInput.value.toString());
      this.nameInput.value = '';
    }
  }

  async dismissAlert() {

    const players = await this.playerService.selectPlayers();
    if (players.length < 2 && this.isOnboarding) {
      this.alertController
        .create({message: 'At least 2 players required', buttons: ['Ok']})
        .then(alert => alert.present());
    } else if (this.isOnboarding) {
      await this.router.navigate(['select-players'])
    }

  }

  removePlayer(name: string) {
    return this.playerService.deletePlayer(name);
  }

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.isOnboarding = params.has('onboard');
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
