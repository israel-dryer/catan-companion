import {inject, Injectable, OnDestroy} from "@angular/core";
import {SettingService} from "./setting.service";
import {liveQuery} from "dexie";
import {TextToSpeech} from "@capacitor-community/text-to-speech";
import {Platform} from "@ionic/angular";

@Injectable({providedIn: 'root'})
export class AudioService implements OnDestroy {

  private settingsSub: any;
  private platform = inject(Platform);
  private diceSound!: HTMLAudioElement;
  private robberSound!: HTMLAudioElement;
  private barbarianSound!: HTMLAudioElement;

  private diceAudioSource = '/assets/sounds/dice-sound.mp3';
  private robberAudioSource = '/assets/sounds/evil-laugh.mp3';
  private barbarianAudioSource = '/assets/sounds/barbarians.mp3';
  private settingService = inject(SettingService);

  diceRollSoundEnabled = false;
  robberSoundEnabled = false;
  speechEnabled = false;
  speechAvailable = false;
  speechVoice: number | undefined;


  constructor() {

    this.platform.ready().then(() => {
      this.diceSound = new Audio(this.diceAudioSource);
      this.diceSound.preload = "auto";

      this.robberSound = new Audio(this.robberAudioSource);
      this.robberSound.preload = "auto";

      this.barbarianSound = new Audio(this.barbarianAudioSource);
      this.barbarianSound.preload = "auto";
    })

    this.settingsSub = liveQuery(() => this.settingService.getAll())
      .subscribe(settings => {
        this.diceRollSoundEnabled = settings.find(s => s.id === 'rollingDiceSoundEnabled')?.value;
        this.robberSoundEnabled = settings.find(s => s.id === 'robberLaughSoundEnabled')?.value;
        this.speechEnabled = settings.find(s => s.id == 'speechEnabled')?.value;
        this.speechAvailable = settings.find(s => s.id === 'speechAvailable')?.value;
        this.speechVoice = settings.find(s => s.id === 'speechVoice')?.value?.index;
      });
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
  }

  playDiceSound() {
    if (this.diceSound.readyState === 4) {
      this.diceSound.play().then();
    } else {
      this.diceSound.load();
      this.diceSound.oncanplay = async () => {
        await this.diceSound.play();
      };
    }

  }

  playRobberSound() {
    if (this.robberSound.readyState === 4) {
      this.robberSound.play().then();
    } else {
      this.robberSound.load();
      this.robberSound.oncanplay = async () => { await this.robberSound.play(); };
    }
  }

  playBarbarianSound() {
    if (this.barbarianSound.readyState === 4) {
      this.barbarianSound.play().then();
    } else {
      this.barbarianSound.load();
      this.barbarianSound.oncanplay = async () => { await this.barbarianSound.play(); };
    }
  }

  speakResult(result: number) {
    if (!this.speechEnabled) { return; }
    this.platform.ready().then(() => {
      TextToSpeech.speak({
        text: result.toString(),
        rate: 0.7,
        voice: this.speechVoice ?? 0,
        lang: navigator.language}).then().catch(e => console.warn(e));
    });
 }

}
