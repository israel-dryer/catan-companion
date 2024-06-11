import {inject, Injectable, OnDestroy} from "@angular/core";
import {SettingService} from "./setting.service";
import {liveQuery} from "dexie";
import {TextToSpeech} from "@capacitor-community/text-to-speech";

@Injectable({providedIn: 'root'})
export class AudioService implements OnDestroy {

  private settingsSub: any;

  private diceSound: HTMLAudioElement;
  private robberSound: HTMLAudioElement;

  private diceAudioSource = '/assets/sounds/dice-sound.mp3';
  private robberAudioSource = '/assets/sounds/evil-laugh.mp3';
  private settingService = inject(SettingService);

  diceRollSoundEnabled = false;
  robberSoundEnabled = false;
  speechEnabled = false;
  speechAvailable = false;
  speechVoice: number | undefined;

  constructor() {

    this.diceSound = new Audio(this.diceAudioSource);
    this.diceSound.load();

    this.robberSound = new Audio(this.robberAudioSource);
    this.robberSound.load();

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
    return this.diceSound.play()
  }

  playRobberSound() {
    return this.robberSound.play();
  }

  speakResult(result: number) {
    if (!this.speechEnabled) { return; }
    TextToSpeech.speak({
      text: result.toString(),
      rate: 0.7,
      voice: this.speechVoice ?? 0,
      lang: navigator.language}).then().catch(e => console.warn(e));
 }

}
