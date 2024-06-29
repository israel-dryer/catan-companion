import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

enum ActionDiceVariant {
  BARBARIAN = '/assets/cities-knights-barbarian.svg',
  BLUE = '/assets/cities-knights-blue.svg',
  GOLD = '/assets/cities-knights-gold.svg',
  GREEN = '/assets/cities-knights-green.svg'
}

enum DiceAction {
  GOLD = 'GLD',
  GREEN = 'GRN',
  BLUE = 'BLU',
  BARBARIAN = 'BAR'
}

@Component({
  standalone: true,
  selector: 'app-action-dice',
  templateUrl: './action-dice.component.html',
  styleUrls: ['./action-dice.component.scss'],
  imports: [
    NgOptimizedImage
  ]
})
export class ActionDiceComponent {
  @Input() action?: string;
  @Input() barbarianCount?: number;
  protected readonly DiceAction = DiceAction;
  protected readonly DiceActionResource = ActionDiceVariant;
}
