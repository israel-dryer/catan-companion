import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, KeyValuePipe} from '@angular/common';
import {
  IonBackButton,
  IonButtons,
  IonContent, IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {SettingService} from "../../services/setting.service";
import {liveQuery} from "dexie";
import {TextToSpeech} from "@capacitor-community/text-to-speech";
import {Directory, Encoding, Filesystem} from '@capacitor/filesystem'
import {Game, Player, StorageService} from "../../services/storage.service";
import {Device} from "@capacitor/device";
import {Share} from "@capacitor/share";
import {from, map} from "rxjs";
import {APP_VERSION} from "../../../main";
import {FilePicker} from "@capawesome/capacitor-file-picker";
import {AlertController} from "@ionic/angular";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonToggle,
    IonLabel,
    AsyncPipe,
    IonNote,
    IonIcon,
    RouterLink,
    IonSelect,
    IonSelectOption,
    KeyValuePipe,
    IonItemGroup,
    IonItemDivider,
    IonFooter
  ]
})
export class SettingsPage implements OnInit {

  private settingService = inject(SettingService);
  private storageService = inject(StorageService);
  private alertController = inject(AlertController);

  $speechAvailable= liveQuery(() => this.settingService.get('speechAvailable'));
  $rollingDiceSoundEnabled = liveQuery(() => this.settingService.get('rollingDiceSoundEnabled'));
  $robberLaughSoundEnabled = liveQuery(() => this.settingService.get('robberLaughSoundEnabled'));
  $speechEnabled = liveQuery(() => this.settingService.get('speechEnabled'));
  $hapticsEnabled = liveQuery(() => this.settingService.get('hapticsEnabled'));
  $showDiceTotal = liveQuery(() => this.settingService.get('showDiceTotal'));
  isAndroid = false;
  availableVoices: string[] = [];
  $selectedVoice = from(liveQuery(() => this.settingService.get('speechVoice'))).pipe(map(result => result.name));

  async ngOnInit() {
    this.isAndroid = (await Device.getInfo()).operatingSystem === 'android';

    const languages = navigator.languages;
    TextToSpeech.getSupportedVoices().then(result => {
      result.voices
        .filter(x => languages.includes(x.lang) && x.localService)
        .forEach(x => this.availableVoices.push(x.voiceURI))
    })
  }

  toggleRollingDiceSound = async ({detail}: any) => {
    await this.settingService.put('rollingDiceSoundEnabled', detail.checked);
  }

  toggleRobberLaughSound = async ({detail}: any) => {
    await this.settingService.put('robberLaughSoundEnabled', detail.checked);
  }

  updateSelectedVoice = async ({detail}: any) => {
    const voice = detail.value;
    TextToSpeech.getSupportedVoices().then(result => {
      const index = result.voices.findIndex(v => v.voiceURI === voice);
      this.settingService.put('speechVoice', {name: voice, index: index});
    });
  }

  toggleAnnounceDiceRoll = async ({detail}: any) => {
    await this.settingService.put('speechEnabled', detail.checked);
  }

  toggleHaptics = async ({detail}: any) => {
    await this.settingService.put('hapticsEnabled', detail.checked);
  }

  resetAppSettings = async () => {
    await this.settingService.reset();
  }

  exportApplicationData = async() => {
    const settings = await this.storageService.db.settings.toArray();
    const games = await this.storageService.db.games.toArray();
    const current = await this.storageService.db.current.toArray();
    const players = await this.storageService.db.players.toArray();

    if (this.isAndroid) {
      await Filesystem.requestPermissions();
      try {
        const result = await Filesystem.writeFile({
          path: 'catan/catan_app_data.json',
          data: JSON.stringify({settings, games, current, players}),
          directory: Directory.Cache,
          encoding: Encoding.UTF8,
          recursive: true
        });
        await Share.share({url: result.uri});
      } catch (err) {
        alert(err);
      }
    } else {
      const blob = new Blob([JSON.stringify({settings, games, current, players})], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'catan_app_data.json';
      link.href = url;
      link.click();
    }
  }

  importAppData = async () => {
    try {
      const result = await FilePicker.pickFiles({types: ['json'], limit: 1, readData: true});
      const fr = new FileReader();

      // handle upload of game data
      fr.onload = (e: any) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.games) {
            data.games.forEach((game: Game) => {
              this.storageService.games.put(game, game.id);
            });
          }
          if (data.players) {
            data.players.forEach((player: Player) => {
              this.storageService.players.put(player, player.name)
            })
          }
        } catch (e: any) {
          this.alertController.create({
            header: e.name,
            message: e.message,
            buttons: ['Ok']
          }).then(alert => alert.present())
        }
      }

      // read blob if existing
      const blob = result.files[0].blob;
      if (blob) {
        fr.readAsText(blob);
      }
    } catch (e: any) {
      this.alertController.create({
        header: e.name,
        message: e.message,
        buttons: ['Ok']
      }).then(alert => alert.present())
    }
  }


  protected readonly APP_VERSION = APP_VERSION;
}
