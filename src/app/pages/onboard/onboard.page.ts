import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonIcon, IonInput,
  IonItem,
  IonLabel, IonList, IonRippleEffect, IonRouterLinkWithHref, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {StepperButtonComponent} from "../../shared/stepper-button/stepper-button.component";
import {StepperConnectorComponent} from "../../shared/stepper-connector/stepper-connector.component";
import {PlayerService} from "../../services/player.service";
import {liveQuery} from "dexie";

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAvatar, IonIcon, IonItem, IonLabel, IonText, IonButton, IonRouterLinkWithHref, RouterLink, IonRippleEffect, StepperButtonComponent, StepperConnectorComponent, IonInput, IonList, IonFooter]
})
export class OnboardPage  {

  onboardStep = 1;
  @ViewChild('nameInput') nameInput!: IonInput;
  constructor() { }


  nextStep() {
    this.onboardStep += 1;
  }

  get step1State() {
    return this.onboardStep > 1 ? 'complete' : 'active';
  }

  get step2State() {
    if (this.onboardStep > 2) {
      return 'complete';
    }
    if (this.onboardStep === 2) {
      return 'active';
    }
    return 'inactive';
  }

  get step3State() {
    if (this.onboardStep > 3) {
      return 'complete';
    }
    if (this.onboardStep === 3) {
      return 'active';
    }
    return 'inactive';
  }

  resetOnboardStep = (event: any, step: number) => {
    if (this.onboardStep >= step) {
      this.onboardStep = step;
    } else {
      event.preventDefault();
    }
  }

  private playerService = inject(PlayerService);
  $currentPlayers = liveQuery(() => this.playerService.selectPlayers());
  addPlayerInputs = [{placeholder: 'Enter a username', name: 'name', value: ''}];

  async addNewPlayer(key: string, name: string) {
    if (key === 'Enter') {
      await this.playerService.insertPlayer(name);
      this.nameInput.value = undefined;
    }

  }

  removePlayer(name: string) {
    return this.playerService.deletePlayer(name);
  }

}
