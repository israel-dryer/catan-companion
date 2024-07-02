import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {APP_VERSION} from "../../../main";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonText, IonIcon]
})
export class AboutPage {

  constructor() { }

  protected readonly APP_VERSION = APP_VERSION;
}
