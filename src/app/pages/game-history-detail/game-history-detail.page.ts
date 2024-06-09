import {map, mergeMap, Observable} from "rxjs";
import {AfterViewInit, Component, inject} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe, Location} from '@angular/common';
import {
  IonAccordion, IonAccordionGroup, IonActionSheet,
  IonBackButton, IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton, IonFabList, IonFooter,
  IonHeader, IonIcon, IonItem, IonLabel,
  IonList, IonListHeader, IonNote, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {Game, Roll} from "../../services/storage.service";
import {GameService} from "../../services/game.service";
import {CurrentService} from "../../services/current.service";
import {liveQuery} from "dexie";


@Component({
  selector: 'app-game-history-detail',
  templateUrl: './game-history-detail.page.html',
  styleUrls: ['./game-history-detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    AsyncPipe,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonText,
    DatePipe,
    DecimalPipe,
    IonAccordionGroup,
    IonAccordion,
    IonListHeader,
    IonFooter,
    IonButton,
    RouterLink,
    IonIcon,
    IonActionSheet,
    IonFab,
    IonFabButton,
    IonFabList
  ]
})
export class GameHistoryDetailPage implements AfterViewInit {

  private location = inject(Location);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);
  private currentService = inject(CurrentService);

  $game!: Observable<Game|undefined>;
  $rolls!: Observable<Roll[]|undefined>;

  ngAfterViewInit() {
    this.$game = this.route.paramMap.pipe(
      mergeMap((params: Params) => {
        const id = Number(params.get('id'));
        return liveQuery(() => this.gameService.selectGame(id))
      })
    );
    this.$rolls = this.$game.pipe(map(game => game?.rolls));
  }

  deleteGame = async (id: number) => {
    await this.gameService.deleteGame(id);
    this.location.back();
  }

  continueGame = async (game: Game) => {
    this.currentService.setCurrentItem('activeGameId', game.id);
    await this.router.navigate(['play']);
  }

  showReports = async (id: number) => {
    await this.router.navigate(['/reports', id]);
  }


}
