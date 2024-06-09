import {inject, Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {TextToSpeech} from "@capacitor-community/text-to-speech";


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private storage = inject(StorageService);

  constructor() {
    this.checkTextToSpeechAvailable().then();
  }

  async checkTextToSpeechAvailable() {
    const isSupported = await TextToSpeech.isLanguageSupported({lang: navigator.language});
    this.storage.settings.put({id: 'speechAvailable', value: isSupported});
  }

  getAll() {
    return this.storage.settings.toArray();
  }

  async get(id: string) {
    return (await this.storage.settings.get(id))?.value;
  }

  put(id: string, value: any) {
    return this.storage.settings.put({id: id, value: value});
  }

  async reset() {
    await this.storage.settings.clear();
    await this.storage.db.populate();
    await this.checkTextToSpeechAvailable();
  }

}
