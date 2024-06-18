import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  dice,
  peopleCircleOutline,
  personAdd,
  close,
  settings,
  barChart,
  arrowUndo,
  list,
  trophy,
  trash,
  document,
  cloudUpload,
  refresh,
  add,
  diceOutline,
  download,
  shareSocial,
  options,
  timer,
  flask, boatOutline, skull, business, businessOutline, skullOutline
} from "ionicons/icons";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      peopleCircleOutline, personAdd, dice, close, settings, barChart,
      arrowUndo, list, trophy, trash, document, cloudUpload, refresh, add,
      download, flask, boatOutline, skull, business, skullOutline, businessOutline,
      diceOutline, shareSocial, options, timer});
  }
}
